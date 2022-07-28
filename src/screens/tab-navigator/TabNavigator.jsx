import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { colors } from '../../utils/colors';
import Home from '../home/Home';
import Favorites from '../favorites/Favorites';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: { marginBottom: 10 },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primarySky,
        tabBarInactiveTintColor: colors.primaryGrey,
        tabBarInactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="star" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
