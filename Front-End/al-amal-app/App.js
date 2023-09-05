import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";
import {
  NavigationContainer,
  validatePathConfig,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import SignUpScreen from "./pages/Signup";
import ForgotPasswordScreen from "./pages/ForgotPassword";
import MainContainerScreen from "./pages/bottom-navigation-bar/MainContainer";
import ChangePasswordScreen from "./pages/ChangePassword"
import EditprofileScreen from "./pages/EditProfile";
import OrphanInfoScreen from "./pages/OrphanInfo";
import CourseDetailScreen from "./pages/CourseDetails";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1,backgroundColor:"white"}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
         <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainContainer"
          component={MainContainerScreen}
          options={{
            gestureEnabled: false,
            headerLeft: null,
            headerShown: false,
          }}
        />
        
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditprofileScreen} options={{ headerShown: false }}/>
      
        <Stack.Screen name="Orphan" component={OrphanInfoScreen} options={{ headerShown: false }}/>

         {/* <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="NotSponsoring" component={NotSponsoringScreen} /> */}
        
        <Stack.Screen name="CourseDetails" component={CourseDetailScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

