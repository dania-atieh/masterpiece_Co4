import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { subToCourseAction } from "../redux/actions/generalActions";
import { getMeAction } from "../redux/actions/profileActions";

const CourseDetails = ({ route }) => {
  const { profile } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    courseId,
    name,
    image,
    startDate,
    age,
    price,
    period,
    location,
    description,
    coachName,
  } = route.params;

  const isSubToCourse = profile?.courses?.some(
    (course) => course._id === courseId,
  );
  const onPressEnrollNow = async () => {
    setLoading(true);
    const data = await subToCourseAction(courseId);
    if (data?.status === "success") {
      await dispatch(getMeAction());
    }
    setLoading(false);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="التسجيل في الدورات" />
      <ScrollView style={styles.scrollViewContent}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.courseTitle}>{name}</Text>
        <Text
          style={[styles.description, { paddingEnd: 50, paddingStart: 35 }]}
        >
          {description}
        </Text>
        <View style={[styles.infoBox, { height: "auto" }]}>
          <Text style={{ textAlign: "right", fontSize: 16 }}>
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.courseInfo}>تاريخ البدء :</Text> {startDate}
            {"\n\n"}
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.courseInfo}>العمر</Text> من {age} سنة و أكبر
            {"\n\n"}
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.courseInfo}>المدة :</Text> {period}
            {"\n\n"}
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.courseInfo}>اسم المدرب/ة :</Text> {coachName}
            {"\n\n"}
            <Text style={styles.bullet}>• </Text>
            <Text style={styles.courseInfo}>المكان:</Text> {location}
            {"\n\n"}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={{ textAlign: "right", fontSize: 16 }}>
            <Text style={styles.courseInfo}>السعر:</Text> {price} د
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            buttonStyle={[
              styles.loginButton,
              {
                marginTop: 50,
                marginHorizontal: 40,
                marginBottom: 100,
              },
            ]}
            onPress={onPressEnrollNow}
            title={isSubToCourse ? "تم التسجيل" : "سجل الآن"}
            disabled={isSubToCourse}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseDetails;
