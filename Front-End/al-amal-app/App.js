import { I18nManager, View } from "react-native";
import { React } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import SignUpScreen from "./pages/Signup";
import ForgotPasswordScreen from "./pages/ForgotPassword";
import MainContainerScreen from "./pages/bottom-navigation-bar/MainContainer";
import ChangePasswordScreen from "./pages/ChangePassword";
import EditprofileScreen from "./pages/EditProfile";
import OrphanInfoScreen from "./pages/OrphanInfo";
import FamilyInfoScreen from "./pages/FamilyInfo";
import CourseDetailScreen from "./pages/CourseDetails";
import NotSponsoringScreen from "./pages/NotSponsoring";
import Toast from "react-native-toast-message";
import store from "./redux/store";
import { Provider } from "react-redux";
import { setTopLevelNavigator } from "./utils/navigation";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NavigationContainer
        ref={(navigatorRef) => setTopLevelNavigator(navigatorRef)}
      >
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

          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditprofileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Orphan"
            component={OrphanInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Family"
            component={FamilyInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotSponsoring"
            component={NotSponsoringScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CourseDetails"
            component={CourseDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const WrappedApp = () => {
  I18nManager.forceRTL(false);
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <App />
        <Toast />
      </View>
    </Provider>
  );
};

export default WrappedApp;
