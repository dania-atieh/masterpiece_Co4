import React, { useCallback, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../../stylesheet/theme";
import TabBarIcons from "../../components/TabBarIcons";

//Screens
import HomeScreen from "./Home";
import DonateScreen from "./Donate";
import ProfileScreen from "./Profile";
import CourseScreen from "./Courses";
import { useDispatch } from "react-redux";
import { getMeAction } from "../../redux/actions/profileActions";
import { RefreshControl, ScrollView } from "react-native";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const getMe = async () => {
    await dispatch(getMeAction());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMe();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      nestedScrollEnabled
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <TabBarIcons
                routeName={route.name}
                focused={focused}
                color={color}
                size={size}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.black,
          tabBarStyle: { height: 90 },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: "", headerShown: false }}
        />
        <Tab.Screen
          name="Courses"
          component={CourseScreen}
          options={{ tabBarLabel: "", headerShown: false }}
        />
        <Tab.Screen
          name="Donate"
          component={DonateScreen}
          options={{ tabBarLabel: "", headerShown: false }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "", headerShown: false }}
        />
      </Tab.Navigator>
    </ScrollView>
  );
};

export default MainContainer;
