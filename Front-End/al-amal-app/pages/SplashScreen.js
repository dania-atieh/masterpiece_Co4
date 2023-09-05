import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import logo from "../assets/white-logo.png"
import { useNavigation } from "@react-navigation/native";
import colors from "../stylesheet/theme";

const SplashScreen = () => {
    const navigation = useNavigation();
  const fadeInAnim = useRef(new Animated.Value(0)).current;
   const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setAppReady(true);
    }, 2000);

    if(appReady === true) {
        navigation.navigate("Login");
    }
  }, [appReady]);

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});

export default SplashScreen;
