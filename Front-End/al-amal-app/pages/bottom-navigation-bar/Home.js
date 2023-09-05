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
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../../stylesheet/theme";
// import styles from "../../stylesheet/style";
import Header from "../../components/HeaderWithoutArrow";
import StickyNote from "../../assets/stickyNote.png";
import charityImg from "../../assets/slide2.png";
import donationImg from "../../assets/slide3.jpg";
import charityteamImg from "../../assets/slide4.jpg";

const { width } = Dimensions.get("window") ;

const slides = [
  {
    type: "image",
    content: StickyNote,
  //   type: "text",
  //   content:
  //     "يمكنك من هنا الإطلاع على تفاصيل اليتيم أو العائلة المحتاجة التي قررت دعمها بمزيد من التفصيل. كما يمكنك أيضًا الحصول على سجل كامل للفواتير التي قمت بدفعها عبر الوسائل الإلكترونية.",
  // },
  },
  {
    type: "image",
    content: donationImg,
  },
  {
    type: "image",
    content: charityImg,
    width: 290,
  },
  {
    type: "image",
    content: charityteamImg,  },
];

const Home = ({ navigation }) => {
  const onPressOrphan = () => {
    navigation.navigate("Orphan");
  };
  const onPressFamily = () => {
    // navigation.navigate("Family");
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        flatListRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current.scrollToIndex({ index: 0, animated: true });
        setCurrentIndex(0);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {item.type === "text" ? (
          <Text style={styles.text}>{item.content}</Text>
        ) : (
          <Image source={item.content} style={styles.image} />
        )}
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "white", height: 800 }}>
      <Header name="الرئيسية" />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "right",

          marginBottom: 30,
          paddingHorizontal: 40,
          paddingTop: 40,
        }}
      >
        أهلاً دانيه عطية
      </Text>
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
        />
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "right",

              marginBottom: 30,
              paddingHorizontal: 40,
            }}
          >
            المكفول:
          </Text>
          <Button
            buttonStyle={styles.loginButton}
            onPress={onPressOrphan}
            title="الأيتام"
          />
          <Button
            buttonStyle={[styles.loginButton, { marginTop: 35 }]}
            onPress={onPressFamily}
            title="الأسر العفيفة"
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatList: {
    height: 300,
  },

  slide: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    // backgroundColor: "#FFF8B7", //yellow
  },

  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "right",
  },

  image: {
    width,
    height: 300,
    resizeMode: "contain",
  },

  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50, //CHANGED IT
    marginTop: 10,
    width: 330,
    marginHorizontal: 40,
  },
});
