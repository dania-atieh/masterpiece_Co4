import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../stylesheet/theme";


//Screens
import HomeScreen from './Home';
import DonateScreen from './Donate';
import ProfileScreen from './Profile';
import CourseScreen from './Courses';

//Screen names
const homeName = "Home";
const donateName = "Donate";
const profileName = "Profile";
const coursesName = "Courses";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === donateName) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === coursesName) {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, // Added line
        tabBarInactiveTintColor: colors.black, // Added line
        // tabBarLabelStyle: { paddingBottom: 10, fontSize: 14 },
        tabBarStyle: { padding: 10, height: 100 },
      })}
    >
      <Tab.Screen
        name="Courses"
        component={CourseScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{  headerShown: false}}
        
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{ tabBarLabel: '', headerShown: false }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default MainContainer