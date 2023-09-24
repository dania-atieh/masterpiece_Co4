import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { setMyToken } from "../utils/token";
import axios from "axios";
import { getMeAction } from "../redux/actions/profileActions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    email: "",
    code: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showCode, setShowCode] = useState(false);

  const onSubmitEmail = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password`,
        {
          email: info.email,
        },
      );
      if (response.data.status === "success") {
        setShowCode(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Something went wrong.");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  const onSubmitReset = async () => {
    setErrorMessage("");
    try {
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/reset-password/${info.code}`,
        {
          password: info.password,
        },
      );
      if (response.data.status === "success") {
        await setMyToken(response.data.token);
        await dispatch(getMeAction());
        Toast.show({
          type: "success",
          text1: "تم تحديث كلمة المرور",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "mainContainer" }],
        });
      } else {
        setErrorMessage("Something went wrong.");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="نسيت كلمة السر" />
      {!showCode ? (
        <View style={{ padding: 40 }}>
          <Text
            style={{
              textAlign: "right",
              fontWeight: "900",
              fontSize: 15,
              marginBottom: 30,
            }}
          >
            قم بإدخال البريد الإلكتروني الخاص بك لتقم بإعداد كلمة سر جديدة عن
            طريق الرابط الذي سيتم إرساله:
          </Text>
          <TextInput
            placeholder="البريد الإلكتروني"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            value={info.email}
            onChangeText={(value) => {
              setInfo({ ...info, email: value });
            }}
            keyboardType="email-address"
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Button
              buttonStyle={styles.loginButton}
              title="إرسال"
              onPress={onSubmitEmail}
              disabled={!info.email}
            />
          </View>
        </View>
      ) : (
        <View style={{ padding: 40 }}>
          <Text
            style={{
              textAlign: "right",
              fontWeight: "900",
              fontSize: 15,
              marginBottom: 30,
            }}
          >
            تم ارسال رمز تأكيد اعادة كلمة المرور الى بريدك الالكتروني, اكتبه
            بالاسفل.
          </Text>
          <TextInput
            placeholder="رمز التأكيد"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            value={info.code}
            onChangeText={(value) => {
              setInfo({ ...info, code: value });
            }}
          />
          <Text
            style={{
              textAlign: "right",
              fontWeight: "900",
              fontSize: 15,
              marginBottom: 30,
            }}
          >
            اكتب كلمة مرور جديدة
          </Text>
          <TextInput
            placeholder="كلمة مرور جديدة"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            value={info.password}
            onChangeText={(value) => {
              setInfo({ ...info, password: value });
            }}
          />

          <View
            style={{
              alignItems: "center",
            }}
          >
            <Button
              buttonStyle={styles.loginButton}
              title="إرسال"
              onPress={onSubmitReset}
              disabled={!info.password || !info.code}
            />
          </View>
        </View>
      )}

      {errorMessage && (
        <Text
          style={{
            color: "red",
            fontSize: 16,
            width: "100%",
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword;
