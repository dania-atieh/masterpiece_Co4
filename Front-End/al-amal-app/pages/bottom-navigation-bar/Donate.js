import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../stylesheet/style";
import Header from "../../components/HeaderWithoutArrow";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

const Donate = ({ navigation }) => {
  const walletNumber = "077-000-0000";
  const ibanNumber = "Jo0000000000000000000000000000";

  const onPressCopyPhoneNumber = async () => {
    await Clipboard.setStringAsync(walletNumber);
    Toast.show({
      type: "success",
      text1: "تم نسخ رقم المحفظة",
    });
  };

  const onPressCopyIBAN = async () => {
    await Clipboard.setStringAsync(ibanNumber);
    Toast.show({
      type: "success",
      text1: "تم نسخ رقم الـ IBAN",
    });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="تبرع" />
      <Text style={styles.headerTitle}>--التبرع عن طريق المحفظة:</Text>
      <Text style={styles.description}>
        محفظة Orange money
        {"\n\n"}
        {walletNumber}
      </Text>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          buttonStyle={[
            styles.loginButton,
            { marginTop: 35, marginHorizontal: 40 },
          ]}
          onPress={onPressCopyPhoneNumber}
          title="نسخ رقم المحفظة"
        />
      </View>
      <Text style={styles.headerTitle}>--التبرع عن طريق الحساب البنكي:</Text>
      <Text style={styles.description}>
        البنك الإسلامي الأردني
        {"\n\n"}
        اسم الحساب: جمعية الأمل
        {"\n\n"}
        رقم الحساب والفرع: 0000000 فرع الجاردنز
        {"\n\n"}
        IBAN {ibanNumber}
      </Text>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          buttonStyle={[
            styles.loginButton,
            { marginTop: 35, marginHorizontal: 40 },
          ]}
          onPress={onPressCopyIBAN}
          title="نسخ ال IBAN"
        />
      </View>
    </View>
  );
};

export default Donate;
