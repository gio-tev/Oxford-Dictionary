import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Home from './Home';
import Favorites from './Favorites';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          // backgroundColor: '#F5F4F3',
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          // marginVertical: 30,
          // borderWidth: 1,
          // borderColor: 'red',
        },
        tabBarActiveTintColor: colors.primaryGreen,
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: { marginBottom: 10 },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="star" size={size} color={color} />
          ),
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
