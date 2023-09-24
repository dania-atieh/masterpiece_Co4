import { Text, View, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import donation from "../assets/donation.png";
import donationOutline from "../assets/donation-outline.png";
import course from "../assets/course.png";
import courseOutline from "../assets/course-outline.png";

const homeName = "Home";
const donateName = "Donate";
const profileName = "Profile";
const coursesName = "Courses";

const TabBarIcons = ({ focused, color, size, routeName }) => {
  let iconName;
  let imageSource;
  let barLabel;

  if (routeName === homeName) {
    iconName = focused ? "home" : "home-outline";
    barLabel = "الرئيسية";
  } else if (routeName === donateName) {
    imageSource = focused ? donationOutline : donation;
    barLabel = "تبرع";
  } else if (routeName === profileName) {
    iconName = focused ? "account" : "account-outline";
    barLabel = "الحساب";
  } else if (routeName === coursesName) {
    imageSource = focused ? courseOutline : course;
    barLabel = "دورات";
  }
  return (
    <View
      style={{
        alignItems: "center",
        gap: 4,
      }}
    >
      {iconName && (
        <MaterialCommunityIcons name={iconName} size={30} color={color} />
      )}
      {imageSource && (
        <Image source={imageSource} style={{ width: 30, height: 30 }} />
      )}
      <Text
        style={{
          color,
          fontWeight: "bold",
        }}
      >
        {barLabel}
      </Text>
    </View>
  );
};

export default TabBarIcons;
