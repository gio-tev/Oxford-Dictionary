import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { colors } from './src/utils/colors';
import Button from './src/components/UI/Button';
import Home from './src/screens/Home';
import Favorites from './src/screens/Favorites';
import WordDetails from './src/screens/WordDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabStack() {
  const icon = <FontAwesome name="star" size={22} color="white" />;
  const darkMode = (
    <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
  );

  return (
    <>
      <StatusBar style="light" />

      <Tab.Navigator
        screenOptions={{
          // headerLeft: () => {
          //   const navigation = useNavigation();
          //   return (
          //     <Button
          //       pressable={({ pressed }) => [
          //         { marginLeft: 15 },
          //         pressed && { transform: [{ scale: 1.1 }] },
          //       ]}
          //       onPress={() => navigation.navigate('Favorites')}
          //       icon={icon}
          //     />
          //   );
          // },
          // headerRight: () => {
          //   const navigation = useNavigation();
          //   return (
          //     <Button
          //       pressable={({ pressed }) => [
          //         { marginRight: 15 },
          //         pressed && { transform: [{ scale: 1.1 }] },
          //       ]}
          //       // onPress={() => navigation.navigate('Favorites')}
          //       icon={darkMode}
          //     />
          //   );
          // },
          headerStyle: {
            backgroundColor: colors.primaryBlack,
          },
          headerTintColor: colors.primaryCream,
          headerTitle: 'English Dictionary',
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: colors.primaryBlack,
            height: 60,
          },
          tabBarActiveTintColor: colors.primaryGreen,
          tabBarIconStyle: { marginTop: 10 },
          tabBarLabelStyle: { marginBottom: 10 },
          // tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerTitle: 'English Dictionary',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerShadowVisible: false,

            // tabBarIconStyle: { color: 'red' },
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            title: 'Favorites',

            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="star" size={size} color={color} />
            ),
            // tabBarBadge: 1,
            tabBarBadgeStyle: {
              backgroundColor: 'white',
              color: 'red',
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.primaryBlack },
          headerTintColor: colors.primaryCream,
        }}
      >
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="WordDetails" component={WordDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
