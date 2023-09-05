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

const ChangePassword = () => {
  const onPressSave = () => {};

  return (
    <View style={{ backgroundColor: "white", height: 900 }}>
      <Header name="تغير كلمة السر" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust the offset if needed
      >
        <ScrollView style={{ height: 900 }}>
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            كلمة السر الحالية:<Text style={{color: "red"}}>*</Text>
          </Text>

          <TextInput
            placeholder="كلمة السر الحالية"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            secureTextEntry={true}
            // value={password}
            // onChangeText={setPassword}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            كلمة السر الجديدة:<Text style={{color: "red"}}>*</Text>{" "}
          </Text>
          <TextInput
            placeholder="كلمة السر الجديدة"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            secureTextEntry={true}
            // value={password}
            // onChangeText={setPassword}
          />
          <Text style={[styles.headerTitle, { fontSize: 18 }]}>
            تأكيد كلمة السر الجديدة:<Text style={{color: "red"}}>*</Text>
          </Text>
          <TextInput
            placeholder="تأكيد كلمة السر الجديدة"
            placeholderColor="#c4c3cb"
            style={[styles.textInput, { backgroundColor: "white" }]}
            secureTextEntry={true}
            // value={password}
            // onChangeText={setPassword}
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
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePassword;
