import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../stylesheet/theme';
import styles from '../stylesheet/style';

const HeaderWithoutArrow = ({name}) => {
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
      </View>
    </View> 
    <View style={styles.line} />
    </>
  )
}
   
  
export default HeaderWithoutArrow