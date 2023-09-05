import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../../stylesheet/theme";
import styles from "../../stylesheet/style";
import Header from "../../components/ProfileHeader";
import { RadioButton } from "react-native-paper";

const Profile = ({ navigation }) => {
  const [checked, setChecked] = useState(null);
  const [gender, setGender] = useState(null); // Set the selected option

  const onPressChangePassword = () => {
    // Navigate to the specified route when the element is pressed
    navigation.navigate("ChangePassword");
  };
  const onPressLogOut = () => {
    // Navigate to the specified route when the element is pressed
    navigation.navigate("Login");
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <Header name="ملفي الشخصي" />
      <ScrollView style={{ height: 700 }}>
        <Text style={[styles.headerTitle, {fontSize: 18} ]}>الاسم</Text>
        <TextInput
          placeholder="اسم المستخدم"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          editable={false} // Disable text input
          // value={username}
        />
        <Text style={[styles.headerTitle, {fontSize: 18} ]}>البريد الإلكتروني</Text>
        <TextInput
          placeholder="البريد الإلكتروني"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          editable={false} // Disable text input
          // value={username}
        />
        <Text style={[styles.headerTitle, {fontSize: 18} ]}>رقم الهاتف</Text>
        <TextInput
          placeholder="رقم الهاتف"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          editable={false} // Disable text input
          // value={username}
        />
        <Text style={[styles.headerTitle, {fontSize: 18} ]}>الجنس</Text>
        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}
          >
            <View style={styles.radioButtonRow}>
              {gender === "male" ? (
                <View style={styles.radioButton}>
                  <Text style={styles.radioLabel}>ذكر</Text>
                  <RadioButton.Android
                    disabled={true}
                    value="male"
                    color={colors.primary}
                    status="checked" // Set the selected status
                  />
                </View>
              ):(
                <View style={styles.radioButton}>
                  <Text style={styles.radioLabel}>ذكر</Text>
                  <RadioButton.Android
                    disabled={true}
                    value="male"
                    color={colors.primary}
                  />
                </View>
              )}
               {gender === "female" ? (
              <View style={styles.radioButton}>
                <Text style={styles.radioLabel}>أنثى</Text>
                <RadioButton.Android
                  disabled={true}
                  value="female"
                  color={colors.primary}
                  status="checked" // Set the selected status
                />
              </View>
               ):(
               <View style={styles.radioButton}>
                <Text style={styles.radioLabel}>أنثى</Text>
                <RadioButton.Android
                  disabled={true}
                  value="female"
                  color={colors.primary}
                />
              </View>)
               }
            </View>
          </RadioButton.Group>
        </View>

        <TouchableOpacity onPress={onPressChangePassword}>
          <Text style={styles.link}>هل تريد تغير كلمة السر؟</Text>
        </TouchableOpacity>
        <Button
          buttonStyle={[
            styles.loginButton,
            {
              marginTop: 35,
              marginHorizontal: 40,
              marginBottom: 150,
              backgroundColor: colors.black,
            },
          ]}
          onPress={onPressLogOut}
          title="تسجيل خروج"
        />
      </ScrollView>
    </View>
  );
};

export default Profile;
