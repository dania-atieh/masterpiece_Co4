import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
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
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

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
    content: charityteamImg,
  },
];

const Home = ({ navigation }) => {
  const { profile } = useSelector((state) => state.profile);

  const onPressOrphan = () => {
    if (profile?.orphans?.length === 0) {
      navigation.navigate("NotSponsoring", {
        type: "يتيم",
      });
    } else {
      navigation.navigate("Orphan");
    }
  };
  const onPressFamily = () => {
    if (profile?.families?.length === 0) {
      navigation.navigate("NotSponsoring", {
        type: "أسرة عفيفة",
      });
    } else {
      navigation.navigate("Family");
    }
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
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
        {`${profile.name ?? ""} أهلاً`}
      </Text>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "right",
              marginBottom: 30,
              paddingHorizontal: 40,
              width: "100%",
              marginTop: 10,
            }}
          >
            المكفول:
          </Text>
          <Button
            buttonStyle={styles.Button}
            onPress={onPressOrphan}
            title="الأيتام"
          />
          <Button
            buttonStyle={[styles.Button, { marginTop: 35 }]}
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
  Button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50,
    marginTop: 10,
    width: 330,
    marginHorizontal: 40,
  },
});
