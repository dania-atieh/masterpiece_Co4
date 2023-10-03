import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import colors from "../stylesheet/theme";

const CourseCard = ({ name, image, startDate, age }) => {
  return (
    <View style={styles.item}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: image }}
          resizeMode="center"
          style={styles.image}
        />
      </View>
      <View style={{ alignSelf: "flex-start", marginTop: 20 }}>
        <Text style={styles.courseTitle}>{name}</Text>

        <Text style={styles.courseDescription}>
          <Text style={{ fontWeight: "bold" }}>البدء:</Text> {startDate}
        </Text>
        <Text style={styles.courseDescription}>
          <Text style={{ fontWeight: "bold" }}>العمر:</Text> {age}
        </Text>
        <Text style={styles.moreLink}>التفاصيل{">>"}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 20,
    marginVertical: 25,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 15,
    height: 230,
    width: 330,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageBox: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#DDE1FF",
    height: 170,
    width: 140,
  },
  image: {
    height: 170,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 10,
  },
  courseDescription: {
    textAlign: "right",
    marginVertical: 5,
  },
  moreLink: {
    textAlign: "right",
    marginTop: 15,
    color: colors.primary,
    fontWeight: "bold",
  },
});
export default CourseCard;
