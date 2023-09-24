import * as React from "react";
import { Text, View, Image } from "react-native";
import styles from "../stylesheet/style";
import FileImage from "../assets/fileNotFound.png";
import Header from "../components/Header";

const NotSponsoring = ({ route }) => {
  const { type } = route.params;

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="الرئيسية" />
      <Image style={styles.fileImage} source={FileImage} />
      <Text
        style={[
          styles.courseTitle,
          { textAlign: "center", paddingHorizontal: 50 },
        ]}
      >
        لم تقم بكفالة {type} بعد.
        {"\n\n\n"}
        اتصل بنا على رقم 0770000000 لتكفل وتفرح فرد أو عائلة 😊
      </Text>
    </View>
  );
};

export default NotSponsoring;
