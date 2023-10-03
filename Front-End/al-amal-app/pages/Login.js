import React, { useState, useCallback } from "react";
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
import colors from "../stylesheet/theme";

import styles from "../stylesheet/style";
import axios from "axios";
import { setMyToken } from "../utils/token";
import { useDispatch } from "react-redux";
import { getMeAction } from "../redux/actions/profileActions";
import { errorsMapper } from "../utils/errorsMapper";

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const navigation = useNavigation();

  const validation = () => {
    if (!user.email) {
      setLoginError("الايميل مطلوب");
      return false;
    }
    if (!isValidEmail(user.email)) {
      setLoginError("الايميل غير صحيح");
      return false;
    }
    if (!user.password) {
      setLoginError("كلمة المرور مطلوبة");
      return false;
    }
    setLoginError("");
    return true;
  };

  const onForgotPasswordPress = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("signup");
  };

  const onSubmit = async () => {
    setLoading(true);
    if (!validation()) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
        {
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
        setLoginError(errorsMapper("went_wrong"));
      }
    } catch (error) {
      setLoginError(errorsMapper(error.response.data.message));
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLoading(false);
        setLoginError("");
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

            <Text style={styles.logoText}>تسجيل دخول</Text>
            <TextInput
              placeholder="البريد الإلكتروني"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              value={user.email}
              onChangeText={(value) => {
                setUser({ ...user, email: value });
              }}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="كلمة السر"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry
              value={user.password}
              onChangeText={(value) => {
                setUser({ ...user, password: value });
              }}
            />

            {loginError && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  paddingBottom: 6,
                }}
              >
                {loginError}
              </Text>
            )}

            <TouchableOpacity onPress={onForgotPasswordPress}>
              <Text style={{ marginStart: 220, marginBottom: 15 }}>
                هل نسيت كلمة السر؟
              </Text>
            </TouchableOpacity>
            <Button
              buttonStyle={styles.loginButton}
              onPress={onSubmit}
              title="تسجيل دخول"
              loading={loading}
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
