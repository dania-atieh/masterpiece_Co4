import React, { useState } from "react";
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
import { Button, SocialIcon, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
import styles from "../stylesheet/style"; 
import colors from "../stylesheet/theme"; 

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onLogInPress = () => {
    navigation.navigate("Login");
  };

  const fetchPost = async () => {
    // try {
    //   const response = await axios.post(
    //     "https://backend-e-commerce-nffh.onrender.com/users/add-user",
    //     {
    //       username,
    //       email,
    //       password,
    //     }
    //   );
    //   console.log("Response:", response.data);
    //   navigation.navigate("home");
    // } catch (error) {
    //   console.error("Error:", error);
    //   console.error("Error response:", error.response);
    // }
  };

  const onSignUpPress = async () => {
    // let hasError = false;

    // if (!username) {
    //   setUsernameError("Username is required");
    //   hasError = true;
    // }

    // if (!email) {
    //   setEmailError("Email is required");
    //   hasError = true;
    // } else if (!isValidEmail(email)) {
    //   setEmailError("Invalid email format");
    //   hasError = true;
    // }

    // if (!password) {
    //   setPasswordError("Password is required");
    //   hasError = true;
    // }

    // if (hasError) {
    //   return;
    // }

    // try {
    //   await fetchPost();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleToggleCheckbox = () => {
    setChecked(!isChecked);
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

            <Text style={styles.logoText}>إنشاء حساب جديد</Text>
            <TextInput
              placeholder="اسم المستخدم"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={setUsername}
              value={username}
            />
            {usernameError && (
              <Text style={styles.errorText}>{usernameError}</Text>
            )}

            <TextInput
              placeholder="أدخل الإيميل الإلكتروني الخاص بك"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              value={email}
              onChangeText={setEmail}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <TextInput
              placeholder="أدخل كلمة السر"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            
            <TextInput
              placeholder="تأكيد كلمة السر"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "flex-end" }}>

              <Text style={{ paddingEnd: 2, fontSize: 15}}>الشروط والأحكام</Text>
              <Text style={{ color: "grey", paddingEnd: 10, fontSize: 15}}>أوافق على جميع</Text>
              
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={handleToggleCheckbox}
              >
                <View style={[styles.checkbox, isChecked && styles.checked]} />
              </TouchableOpacity>
            </View>
            <Button
              buttonStyle={styles.loginButton}
              style={{ marginTop: 40 }}
              onPress={() => onSignUpPress()}
              title="إنشاء حساب جديد"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 110,
                marginStart: 90,
              }}
            >
              <TouchableOpacity onPress={onLogInPress}>
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  تسجيل دخول
                </Text>
              </TouchableOpacity>
              <Text>هل لديك حساب؟ </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
