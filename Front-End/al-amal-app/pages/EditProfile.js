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
import colors from "../stylesheet/theme";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { RadioButton } from "react-native-paper";

const EditProfile = () => {
  const [checked, setChecked] = useState(null);

  const onPressSave = () => {};

  return (
    <View style={{ backgroundColor: "white", height: 900 }}>
      <Header name="تعديل المعلومات" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust the offset if needed
      >
        <View style={{ height: 700 }}>
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>الاسم</Text>
          <TextInput
            placeholder="اسم المستخدم"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            // onChangeText={setUsername}
            // value={username}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            البريد الإلكتروني
          </Text>
          <TextInput
            placeholder="البريد الإلكتروني"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            // onChangeText={setUsername}
            // value={username}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>رقم الهاتف</Text>
          <TextInput
            placeholder="رقم الهاتف"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            // onChangeText={setUsername}
            // value={username}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>الجنس</Text>
          <View style={styles.radioContainer}>
            <RadioButton.Group
              onValueChange={(newValue) => setChecked(newValue)}
              value={checked}
            >
              <View style={styles.radioButtonRow}>
                <View style={styles.radioButton}>
                  <Text style={styles.radioLabel}>ذكر</Text>
                  <RadioButton.Android value="male" color={colors.primary} />
                </View>

                <View style={styles.radioButton}>
                  <Text style={styles.radioLabel}>أنثى</Text>
                  <RadioButton.Android value="female" color={colors.primary} />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <Button
            buttonStyle={[
              styles.loginButton,
              {
                marginTop: 35,
                marginHorizontal: 40,
                marginBottom: 150,
              },
            ]}
            onPress={onPressSave}
            title="حفظ"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;
