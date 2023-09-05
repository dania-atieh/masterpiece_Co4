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
import styles from "../stylesheet/style"; 
import Header from "../components/Header"


const ForgotPassword = () => {
  return ( 
  <View style={{ backgroundColor: "white", height: 900 }}>
  <Header name="نسيت كلمة السر"/>
    <View style={{padding: 40}}>
     
    <Text style={{ textAlign: "right" , fontWeight: '900',fontSize: 15, marginBottom:30}}>
    قم بإدخال البريد الإلكتروني الخاص بك لتقم بإعداد كلمة سر جديدة عن طريق الرابط الذي سيتم إرساله:
    </Text>
    <TextInput
              placeholder="البريد الإلكتروني"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
            //   value={email}
            //   onChangeText={setEmail}
            />
            <Button
              buttonStyle={styles.loginButton}
            //   onPress={fetchPost}
              title="إرسال"
            />
    </View>
    </View>
  )
}

export default ForgotPassword