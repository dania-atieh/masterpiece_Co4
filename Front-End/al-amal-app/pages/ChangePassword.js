import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateMyPassword } from "../redux/actions/profileActions";
import { profileActions } from "../redux/reducers/profileSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { error, loading } = useSelector((state) => state.profile);

  const [user, setUser] = useState({
    passwordCurrent: "",
    password: "",
    conPassword: "",
  });

  const validation = () => {
    if (user.password !== user.conPassword) {
      dispatch(profileActions.setError("كلمات السر غير متطابقة"));
      return false;
    }
    dispatch(profileActions.setError(null));
    return true;
  };

  const onPressSave = async () => {
    if (!validation()) {
      return;
    }

    const callback = () => {
      navigation.navigate("Profile");
    };
    await dispatch(updateMyPassword(user, callback));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(profileActions.setError(""));
    }, []),
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="تغير كلمة السر" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            كلمة السر الحالية:<Text style={{ color: "red" }}>*</Text>
          </Text>

          <TextInput
            placeholder="كلمة السر الحالية"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            secureTextEntry
            value={user.passwordCurrent}
            onChangeText={(value) => {
              setUser({ ...user, passwordCurrent: value });
            }}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            كلمة السر الجديدة:<Text style={{ color: "red" }}>*</Text>{" "}
          </Text>
          <TextInput
            placeholder="كلمة السر الجديدة"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            secureTextEntry
            value={user.password}
            onChangeText={(value) => {
              setUser({ ...user, password: value });
            }}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            تأكيد كلمة السر الجديدة:<Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            placeholder="تأكيد كلمة السر الجديدة"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            secureTextEntry
            value={user.conPassword}
            onChangeText={(value) => {
              setUser({ ...user, conPassword: value });
            }}
          />
          <Text style={[styles.headerTitle, { fontSize: 15, marginBottom: 0 }]}>
            {" "}
            كلمة السر يجب أن تحتوي:
          </Text>
          <Text
            style={[
              styles.headerTitle,
              { fontSize: 15, fontWeight: "normal", marginTop: 20 },
            ]}
          >
            1- على الأقل حرف واحد كبير.
            {"\n\n"}
            2- على الأقل حرف واحد صغير.
            {"\n\n"}
            3- على الأقل رقم واحد من 0 ألى 9.
            {"\n\n"}
            4- على الأقل رمز خاص مثل ! % @ * () # ^ $ ? , ; {"\n\n"}
            5- على الأقل 8 خانات.
          </Text>

          {error && (
            <Text
              style={{
                color: "red",
                fontSize: 16,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          )}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Button
              buttonStyle={[
                styles.loginButton,
                {
                  marginTop: 25,
                  marginHorizontal: 40,
                  marginBottom: 250,
                },
              ]}
              onPress={onPressSave}
              title="حفظ"
              disabled={
                !user.password || !user.conPassword || !user.passwordCurrent
              }
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePassword;
