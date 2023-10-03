import React, { useCallback, useState } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  Text,
} from "react-native";
import styles from "../../stylesheet/style";
import Header from "../../components/HeaderWithoutArrow";
import CourseCard from "../../components/CourseCard";
import { getCoursesAction } from "../../redux/actions/generalActions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGourses = async () => {
    const coursesData = await getCoursesAction();
    if (coursesData.data?.courses?.length > 0) {
      setCourses(coursesData.data?.courses);
    }
    setLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      setCourses([]);
      setLoading(true);
      getGourses();
      return () => {
        setCourses([]);
        setLoading(true);
      };
    }, []),
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="التسجيل في الدورات" />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#77B029" />
        </View>
      ) : (
        <View style={styles.coursesFlatlistContainer}>
          {courses.length > 0 ? (
            <ScrollView nestedScrollEnabled>
              {courses.map((course) => (
                <RenderItem key={course._id} course={course} />
              ))}
            </ScrollView>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                لا يوجد دورات حاليا
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default Courses;

const RenderItem = ({ course }) => {
  const navigation = useNavigation();
  const OnCoursePress = () => {
    navigation.navigate("CourseDetails", {
      courseId: course._id,
      name: course.name,
      image: course.courseImageUrl,
      startDate: course.startDate,
      age: course.age,
      price: course.price,
      period: course.period,
      location: course.location,
      description: course.description,
      coachName: course.coachName,
    });
  };

  return (
    <TouchableOpacity onPress={() => OnCoursePress()}>
      <CourseCard
        name={course.name}
        image={course.courseImageUrl}
        startDate={course.startDate}
        age={course.age}
      />
    </TouchableOpacity>
  );
};
