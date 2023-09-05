import * as React from "react";
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
  FlatList,
} from "react-native";
import { Button } from "react-native-elements";
// import colors from "../../stylesheet/theme";
// import styles from "../../stylesheet/style";
import Header from "../components/Header";

const CourseDetails = () => {
  return (
    <View style={{ backgroundColor: "white", height: 900 }}>
      <Header name="التسجيل في الدورات" />
    </View>
  );
};

export default CourseDetails;
