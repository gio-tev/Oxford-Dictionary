import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import store from './src/store';
import { themeActions, dataActions } from './src/store';
import { DefaultTheme, DarkTheme } from './src/utils/colors';
import WordDetails from './src/screens/WordDetails';
import TabNavigator from './src/screens/TabNavigator';
import Button from './src/components/UI/Button';
import { init, fetchFavorites } from './src/utils/database';

const Stack = createStackNavigator();

function Index() {
  const darkMode = useSelector(state => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFavorites()
      .then(response => dispatch(dataActions.setDatabaseFavorites(response)))
      .catch(error => console.log(error));
  }, []);

  const modeIcon = (
    <MaterialCommunityIcons
      name="theme-light-dark"
      size={30}
      color={darkMode ? 'white' : 'black'}
    />
  );

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />

      <Stack.Navigator
        screenOptions={{
          title: 'Oxford Dictionary',
          headerRight: () => {
            return (
              <Button
                pressable={({ pressed }) => [
                  { marginRight: 15 },
                  pressed && { transform: [{ scale: 1.2 }] },
                ]}
                onPress={() => dispatch(themeActions.toggleMode())}
                icon={modeIcon}
              />
            );
          },
          headerStyle: {
            height: 130,
            // backgroundColor: DefaultTheme.colors.card,
          },
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: darkMode ? 'white' : 'black',
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />

        <Stack.Screen name="WordDetails" component={WordDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    // const initAndFetchData =async() => {
    //   await init()
    // }
    init()
      .then(() => setDbInitialized(true))
      .catch(error => console.log(error));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider store={store}>
        <Index />
      </Provider>
    </View>
  );
}

export default App;
