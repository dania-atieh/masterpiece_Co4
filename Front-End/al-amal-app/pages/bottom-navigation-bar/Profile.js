import React, { useCallback, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../../stylesheet/theme";
import styles from "../../stylesheet/style";
import Header from "../../components/ProfileHeader";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setMyToken } from "../../utils/token";
import { deleteMeAction } from "../../redux/actions/profileActions";
import { useFocusEffect } from "@react-navigation/native";
import { profileActions } from "../../redux/reducers/profileSlice";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  const onPressChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const onPressLogOut = async () => {
    await setMyToken("");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const [deleteModalVisable, setDeleteModalVisable] = useState(false);

  const onPressDelete = () => {
    setDeleteModalVisable(true);
  };

  const onDelete = () => {
    const callback = () => {
      setDeleteModalVisable(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    };
    dispatch(deleteMeAction(callback));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(profileActions.setError(""));
    }, []),
  );
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <DeleteModal
        deleteModalVisable={deleteModalVisable}
        setDeleteModalVisable={setDeleteModalVisable}
        onDelete={onDelete}
      />

      <Header name="ملفي الشخصي" />
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
        <Text style={[styles.headerTitle, { fontSize: 18 }]}>الاسم</Text>
        <TextInput
          placeholder="اسم المستخدم"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          editable={false}
          value={profile.name}
        />
        <Text style={[styles.headerTitle, { fontSize: 18 }]}>
          البريد الإلكتروني
        </Text>
        <TextInput
          placeholder="البريد الإلكتروني"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          editable={false}
          value={profile.email}
        />
        <Text style={[styles.headerTitle, { fontSize: 18 }]}>رقم الهاتف</Text>
        <TextInput
          placeholder="رقم الهاتف"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          editable={false}
          value={profile.phoneNumber}
        />
        {profile.gender ? (
          <>
            <Text style={[styles.headerTitle, { fontSize: 18 }]}>الجنس</Text>
            <View style={styles.radioContainer}>
              <RadioButton.Group>
                <View style={styles.radioButtonRow}>
                  <View style={styles.radioButton}>
                    <Text style={styles.radioLabel}>ذكر</Text>
                    <RadioButton.Android
                      disabled
                      value="male"
                      color={colors.primary}
                      status={
                        profile.gender === "male" ? "checked" : "unchecked"
                      }
                    />
                  </View>
                  <View style={styles.radioButton}>
                    <Text style={styles.radioLabel}>أنثى</Text>
                    <RadioButton.Android
                      disabled
                      value="female"
                      color={colors.primary}
                      status={
                        profile.gender === "female" ? "checked" : "unchecked"
                      }
                    />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </>
        ) : null}

        <TouchableOpacity onPress={onPressChangePassword}>
          <Text style={styles.link}>هل تريد تغير كلمة السر؟</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete}>
          <Text
            style={{
              fontSize: 16,
              color: "#f3214c",
              textDecorationLine: "underline",
              textAlign: "right",
              marginBottom: 30,
              marginHorizontal: 40,
            }}
          >
            حذف الحساب
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            buttonStyle={[
              styles.loginButton,
              {
                marginBottom: 120,
                marginHorizontal: 40,
                backgroundColor: colors.black,
              },
            ]}
            onPress={onPressLogOut}
            title="تسجيل خروج"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const DeleteModal = ({
  deleteModalVisable,
  setDeleteModalVisable,
  onDelete,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={deleteModalVisable}
      onRequestClose={() => {
        setDeleteModalVisable(!deleteModalVisable);
      }}
    >
      <View style={modalStyle.centeredView}>
        <View style={modalStyle.modalView}>
          <Text style={modalStyle.modalTextTitle}>حذف الحساب</Text>
          <Text style={modalStyle.modalText}>
            سيتم حذف الحساب وازالة التبرعات والغاء الاشتراك في الدورات, هل أنت
            متأكد؟
          </Text>
          <Pressable
            style={[modalStyle.button, modalStyle.buttonDelete]}
            onPress={onDelete}
          >
            <Text style={modalStyle.textStyle}>حذف</Text>
          </Pressable>
          <Pressable
            style={[modalStyle.button, modalStyle.buttonClose]}
            onPress={() => setDeleteModalVisable(!deleteModalVisable)}
          >
            <Text style={modalStyle.textStyle}>الغاء</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    gap: 8,
  },
  button: {
    borderRadius: 6,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: "#f3214c",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTextTitle: {
    marginBottom: 10,
    textAlign: "right",
    fontSize: 20,
    width: "100%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "right",
    width: "100%",
  },
});
