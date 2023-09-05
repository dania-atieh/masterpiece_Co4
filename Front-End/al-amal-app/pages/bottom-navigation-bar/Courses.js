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
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../../stylesheet/theme";
import styles from "../../stylesheet/style";
import Header from "../../components/HeaderWithoutArrow";
import CourseCard from "../../components/CourseCard";

const Courses = ({ navigation }) => {
  const courses = [
    {
      courseName: "دورة خياطة",
      image:
        "https://png.pngtree.com/png-clipart/20230604/original/pngtree-sewing-machine-drawn-in-outlines-with-a-button-png-image_9177743.png",
      startDate: "10-10-2023",
      age: "من 16 سنة و أكبر",
    },
    {
      courseName: "دورة خياطة",
      image:
        "https://png.pngtree.com/png-clipart/20230604/original/pngtree-sewing-machine-drawn-in-outlines-with-a-button-png-image_9177743.png",
      startDate: "10-10-2023",
      age: "من 16 سنة و أكبر",
    },
    {
      courseName: "دورة خياطة",
      image:
        "https://png.pngtree.com/png-clipart/20230604/original/pngtree-sewing-machine-drawn-in-outlines-with-a-button-png-image_9177743.png",
      startDate: "10-10-2023",
      age: "من 16 سنة و أكبر",
    },
    {
      courseName: "دورة خياطة",
      image:
        "https://png.pngtree.com/png-clipart/20230604/original/pngtree-sewing-machine-drawn-in-outlines-with-a-button-png-image_9177743.png",
      startDate: "10-10-2023",
      age: "من 16 سنة و أكبر",
    },
  ];

  const OnCoursePress = () => {
    navigation.navigate("CourseDetails");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => OnCoursePress(item.CategoryName)}>
      <CourseCard
        name={item.courseName}
        image={item.image}
        startDate={item.startDate}
        age={item.age}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: "white", height: 900 }}>
      <Header name="التسجيل في الدورات" />
      <View style={styles.coursesFlatlistContainer}>
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.CategoryName}
        />
      </View>
    </View>
  );
};

export default Courses;
