import React, { useCallback, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import logo from "../assets/white-logo.png";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../stylesheet/theme";
import { getMyToken } from "../utils/token";
import { useDispatch } from "react-redux";
import { getMeAction } from "../redux/actions/profileActions";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const navigateTo = async () => {
    const token = await getMyToken();
    if (token) {
      await dispatch(getMeAction());

      navigation.reset({
        index: 0,
        routes: [{ name: "mainContainer" }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        navigateTo();
      }, 1000);
      return () => {};
    }, []),
  );

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.image, { opacity: fadeInAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
});

export default SplashScreen;
