import React, { useState, useContext } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import colors from "../stylesheet/theme";
// import axios from "axios";

import styles from "../stylesheet/style"; 
// import { AppContext } from "../components/Context";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // New state for login error
  const navigation = useNavigation();
  // const { setData } = useContext(AppContext);
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const fetchPost = () => {
    navigation.navigate("mainContainer");
  }

  // const fetchPost = async () => {
  //   if (validateEmail() && validatePassword()) {
  //     try {
  //       const response = await axios.post(
  //         "https://backend-e-commerce-nffh.onrender.com/users",
  //         {
  //           email,
  //           password,
  //         }
  //       );
  //       // console.log("Response:", response.data);
  //       if (response.data === "Email or password not exist") {
  //         setLoginError("Invalid email or password"); // Set the login error message
  //       } else {
  //         navigation.navigate("home");
  //         const data = [response.data[0].username, response.data[0].email,response.data[0].id];

  //         setData(data);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       console.error("Error response:", error.response);
  //     }
  //   }
  // };

  const onForgotPasswordPress = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("signup");
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Image
              source={require("../assets/logo.png")}
              style={{
                width: 120,
                height: 120,
                marginStart: 110,
                marginTop: 100,
              }}
              resizeMode="contain"
            />

            <Text style={styles.logoText}>تسجيل دخول</Text>
            <TextInput
              placeholder="البريد الإلكتروني"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              value={email}
              onChangeText={setEmail}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              placeholder="كلمة السر"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            {loginError && <Text style={styles.errorText}>{loginError}</Text>}

            <TouchableOpacity onPress={onForgotPasswordPress}>
              <Text style={{ marginStart: 220, marginBottom: 15 }}>
                هل نسيت كلمة السر؟
              </Text>
            </TouchableOpacity>
            <Button
              buttonStyle={styles.loginButton}
              onPress={fetchPost}
              title="تسجيل دخول"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 250,
                marginStart: 70,
              }}
            >
              
              <TouchableOpacity onPress={onSignUpPress}>
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  إنشاء حساب جديد
                </Text>
              </TouchableOpacity>
              <Text>ليس لديك حساب؟</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
