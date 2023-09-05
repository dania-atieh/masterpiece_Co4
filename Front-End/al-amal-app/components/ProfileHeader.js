import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../stylesheet/theme";
import { Icon } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheet/style';

const ProfileHeader = ({ name }) => {

    const navigation = useNavigation();

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.left}>
          <Image
            source={require("../assets/logo-without-title.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.middle}>
          <Text style={styles.pageName}>{name}</Text>
        </View>
        <View style={styles.right}>
          <Icon
            color="#77B029"
            containerStyle={{}}
            disabledStyle={{}}
            iconProps={{}}
            iconStyle={{}}
            name="edit"
            onLongPress={() => console.log("onLongPress()")}
            onPress={() => navigation.navigate("EditProfile")}
            reverse
            size={15}
            type="material"
          />
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
};
export default ProfileHeader;
