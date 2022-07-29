import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { themeActions, dataActions } from '../../store';
import TabNavigator from '../tab-navigator/TabNavigator';
import WordDetails from '../word-details/WordDetails';
import Button from '../../components/UI/Button';
import { DefaultTheme, DarkTheme } from '../../utils/colors';
import { init, fetchFavorites } from '../../utils/database';

const Stack = createStackNavigator();

function StackNavigator() {
  const darkMode = useSelector(state => state.theme.darkMode);
  const dispatch = useDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const initAndGetData = async () => {
      try {
        await init();

        const response = await fetchFavorites();
        dispatch(dataActions.setDatabaseFavorites(response));

        const value = await AsyncStorage.getItem('theme');
        if (value !== null) {
          dispatch(themeActions.setAsyncStorageThemeState(JSON.parse(value)));

          setAppIsReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    initAndGetData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  const handleThemeChangePress = () => {
    dispatch(themeActions.toggleMode());

    const storeData = async value => {
      try {
        await AsyncStorage.setItem('theme', JSON.stringify(!value));
      } catch (e) {
        console.log(e);
      }
    };

    storeData(darkMode);
  };

  const modeIcon = (
    <MaterialCommunityIcons
      name="theme-light-dark"
      size={30}
      color={darkMode ? 'white' : 'black'}
    />
  );

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
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
                  onPress={handleThemeChangePress}
                  icon={modeIcon}
                />
              );
            },
            headerStyle: {
              height: 130,
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
    </View>
  );
}

export default StackNavigator;
