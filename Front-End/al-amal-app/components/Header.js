import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import colors from '../stylesheet/theme';
import { useNavigation } from "@react-navigation/native";
import styles from '../stylesheet/style';


const Header = ({name}) => {

    const navigation = useNavigation(); // Initialize useNavigation

  // Handle arrow button press to go back
  const handleBackPress = () => {
    navigation.goBack(); // Go back one page
  };

  return (
    <>
    <View style={styles.headerContainer}>
      <View style={styles.left}>
        <Image
          source={require('../assets/logo-without-title.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.middle}>
        <Text style={styles.pageName}>{name}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={handleBackPress}>
        <Ionicons name="arrow-forward" size={40} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View> 
    <View style={styles.line} />
    </>
  );
};

export default Header;
