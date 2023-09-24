import React, { useCallback, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "../stylesheet/style";
import colors from "../stylesheet/theme";
import axios from "axios";
import { setMyToken } from "../utils/token";
import { useDispatch } from "react-redux";
import { getMeAction } from "../redux/actions/profileActions";

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const SignUp = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    isChecked: false,
  });

  const [signupError, setSignupError] = useState("");

  const onLogInPress = () => {
    navigation.navigate("Login");
  };

  const validation = () => {
    if (!isValidEmail(user.email)) {
      setSignupError("الايميل غير صحيح");
      return false;
    }
    if (user.password !== user.conPassword) {
      setSignupError("كلمات السر غير متطابقة");
      return false;
    }
    setSignupError("");
    return true;
  };

  const onSignUpPress = async () => {
    setLoading(true);
    if (!validation()) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users/signup`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      );
      if (response.data.token) {
        await setMyToken(response.data.token);
        await dispatch(getMeAction());
        navigation.reset({
          index: 0,
          routes: [{ name: "mainContainer" }],
        });
      } else {
        setSignupError("Something went wrong.");
      }
    } catch (error) {
      setSignupError(error.response.data.message);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLoading(false);
        setSignupError("");
      };
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
              value={user.name}
              onChangeText={(value) => {
                setUser({ ...user, name: value });
              }}
              keyboardType="default"
            />
            <TextInput
              placeholder="أدخل الإيميل الإلكتروني الخاص بك"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              value={user.email}
              onChangeText={(value) => {
                setUser({ ...user, email: value });
              }}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="أدخل كلمة السر"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry
              value={user.password}
              onChangeText={(value) => {
                setUser({ ...user, password: value });
              }}
            />

            <TextInput
              placeholder="تأكيد كلمة السر"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry
              value={user.conPassword}
              onChangeText={(value) => setUser({ ...user, conPassword: value })}
            />

            {signupError && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  maxWidth: 350,
                }}
              >
                {signupError}
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "flex-end",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Text style={{ fontSize: 15 }}>الشروط والأحكام</Text>
                <Text style={{ color: "grey", fontSize: 15 }}>
                  أوافق على جميع
                </Text>
              </View>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setUser({ ...user, isChecked: !user.isChecked })}
              >
                <View
                  style={[styles.checkbox, user.isChecked && styles.checked]}
                />
              </TouchableOpacity>
            </View>
            <Button
              buttonStyle={styles.loginButton}
              onPress={onSignUpPress}
              title="إنشاء حساب جديد"
              disabled={
                !user.isChecked ||
                !user.email ||
                !user.password ||
                !user.conPassword
              }
              loading={loading}
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
