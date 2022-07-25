import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { colors } from '../utils/colors';
import Home from './Home';
import Favorites from './Favorites';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          // backgroundColor: '#F5F4F3',
          height: 60,
          borderTopWidth: 0,
          elevation: 0,

          // borderWidth: 1,
          // borderColor: 'red',
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: { marginBottom: 10 },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primarySky,
        tabBarInactiveTintColor: colors.primaryGrey,
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
          // tabBarBadge: 1,
          // tabBarBadgeStyle: {
          //   backgroundColor: 'white',
          //   color: 'red',
          // },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
