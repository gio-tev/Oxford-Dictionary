import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import WordDetails from './src/screens/WordDetails';
import TabNavigator from './src/screens/TabNavigator';
import Button from './src/components/UI/Button';
import { DefaultTheme, DarkTheme } from './src/utils/colors';

const Stack = createStackNavigator();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // const scheme = useColorScheme();
  // console.log(scheme);
  // const { colors } = useTheme();
  // console.log(colors);

  // console.log(DefaultTheme);
  // console.log(DarkTheme);

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
          title: 'Dictionary',
          headerRight: () => {
            return (
              <Button
                pressable={({ pressed }) => [
                  { marginRight: 15 },
                  pressed && { transform: [{ scale: 1.2 }] },
                ]}
                onPress={() => setDarkMode(val => !val)}
                icon={modeIcon}
              />
            );
          },
          headerStyle: {
            height: 150,
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          // headerStyle: { backgroundColor: DefaultTheme.colors.background },
          // headerStyle: { backgroundColor: 'white' },
          // headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />

        <Stack.Screen name="WordDetails" component={WordDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
