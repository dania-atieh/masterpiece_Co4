import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../stylesheet/theme";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateMeAction } from "../redux/actions/profileActions";
import { useFocusEffect } from "@react-navigation/native";
import { profileActions } from "../redux/reducers/profileSlice";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, error, loading } = useSelector((state) => state.profile);

  const [user, setUser] = useState({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phoneNumber: profile?.phoneNumber ?? "",
    gender: profile?.gender ?? "",
  });

  const setValue = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const onPressSave = () => {
    const callback = () => {
      navigation.navigate("Profile");
    };
    dispatch(updateMeAction(user, callback));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(profileActions.setError(""));
    }, []),
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="تعديل المعلومات" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>الاسم</Text>
          <TextInput
            placeholder="اسم المستخدم"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            value={user.name}
            onChangeText={(value) => setValue("name", value)}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            البريد الإلكتروني
          </Text>
          <TextInput
            placeholder="البريد الإلكتروني"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            value={user.email}
            onChangeText={(value) => setValue("email", value)}
            keyboardType="email-address"
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>رقم الهاتف</Text>
          <TextInput
            placeholder="رقم الهاتف"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            value={user.phoneNumber}
            onChangeText={(value) => setValue("phoneNumber", value)}
            keyboardType="phone-pad"
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>الجنس</Text>
          <View style={styles.radioContainer}>
            <RadioButton.Group
              onValueChange={(value) => setValue("gender", value)}
            >
              <View style={styles.radioButtonRow}>
                <View style={styles.radioButton}>
                  <Text style={styles.radioLabel}>ذكر</Text>
                  <RadioButton.Android
                    value="male"
                    color={colors.primary}
                    status={user.gender === "male" ? "checked" : "unchecked"}
                  />
                </View>
                <View style={styles.radioButton}>
                  <Text style={styles.radioLabel}>أنثى</Text>
                  <RadioButton.Android
                    value="female"
                    color={colors.primary}
                    status={user.gender === "female" ? "checked" : "unchecked"}
                  />
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            {error && (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: "red",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  fontSize: 14,
                  paddingHorizontal: 60,
                }}
              >
                {error}
              </Text>
            )}
            <Button
              buttonStyle={[
                styles.loginButton,
                {
                  marginTop: 20,
                },
              ]}
              onPress={onPressSave}
              title="حفظ"
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;
