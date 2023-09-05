import * as React from 'react';
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
  } from "react-native";
  import { Button } from "react-native-elements";
  import colors from "../../stylesheet/theme";
  import styles from "../../stylesheet/style"; 
  import Header from "../../components/HeaderWithoutArrow";

const Donate = ({navigation}) => {
  const onPressCopyPhoneNumber = () => {};
  const onPressCopyIBAN = () => {};
  return (
    <View style={{ backgroundColor: "white", height: 900  }}>
    <Header name="تبرع" />
    <Text style={styles.headerTitle}>--التبرع عن طريق المحفظة:</Text>
    <Text style={styles.description}>
      محفظة Orange money
      {"\n\n"}
      077-000-0000
    </Text>
    <Button
      buttonStyle={[styles.loginButton, { marginTop: 35, marginHorizontal:40, }]}
      onPress={onPressCopyPhoneNumber}
      title="نسخ رقم المحفظة"
    />

    <Text style={styles.headerTitle}>--التبرع عن طريق الحساب البنكي:</Text>
    <Text style={styles.description}>
      البنك الإسلامي الأردني
      {"\n\n"}
      اسم الحساب: جمعية الأمل
      {"\n\n"}
      رقم الحساب والفرع: 0000000 فرع الجاردنز
      {"\n\n"}
      IBAN Jo0000000000000000000000000000
    </Text>
    <Button
      buttonStyle={[styles.loginButton, { marginTop: 35, marginHorizontal:40}]}
      onPress={onPressCopyIBAN}
      title="نسخ ال IBAN"
    />
  </View>
  )
}

export default Donate