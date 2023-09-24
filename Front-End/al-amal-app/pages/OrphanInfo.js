import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
} from "react-native";
import colors from "../stylesheet/theme";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";

const OrphanInfo = () => {
  const [selectedOrphan, setSelectedOrphan] = useState(null);

  const staticOrphanData = ["تحديد", "رقم", "الاسم", "ملف المعلومات"];
  const staticBillsData = ["رقم", "مقبوضات", "البيان", "التاريخ", "صورة"];

  const { profile } = useSelector((state) => state.profile);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header name="الرئيسية" />
      <Text style={styles.headerTitle}>الأيتام:</Text>
      <View style={{ direction: "rtl" }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {staticOrphanData.map((data) => (
                <View key={data} style={[styles.cell]}>
                  <Text style={styles.headerText}>{data}</Text>
                </View>
              ))}
            </View>
            {profile?.orphans?.map((data, rowIndex) => (
              <RowForOrphanTable
                key={data._id}
                orphanData={data}
                rowIndex={rowIndex}
                onSelect={(data) => {
                  setSelectedOrphan(data);
                }}
                selectedOrphan={selectedOrphan}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Text>{"\n\n"}</Text>

      {selectedOrphan && (
        <>
          <Text style={styles.headerTitle}>الفواتير:</Text>
          <View style={{ direction: "rtl" }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              <View style={styles.table}>
                <View style={[styles.row, styles.headerRow]}>
                  {staticBillsData.map((data) => (
                    <View key={data} style={[styles.cell]}>
                      <Text style={styles.headerText}>{data}</Text>
                    </View>
                  ))}
                </View>
                {selectedOrphan?.bills?.map((data, rowIndex) => (
                  <RowForBillTable
                    key={data._id}
                    billData={data}
                    rowIndex={rowIndex}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default OrphanInfo;

const RowForOrphanTable = ({
  orphanData,
  rowIndex,
  onSelect,
  selectedOrphan,
}) => {
  const rowStyle = rowIndex % 2 === 0 ? styles.whiteRow : styles.greyRow;
  return (
    <View style={[styles.row, rowStyle]}>
      <RadioButton.Group onValueChange={() => onSelect(orphanData)}>
        <View style={[styles.radioButtonRow, { width: 100 }]}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              color={colors.primary}
              status={
                selectedOrphan?._id === orphanData._id ? "checked" : "unchecked"
              }
            />
          </View>
        </View>
      </RadioButton.Group>

      <View style={styles.cell}>
        <Text>{rowIndex + 1}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{orphanData?.name}</Text>
      </View>
      <View style={styles.cell}>
        <TouchableOpacity
          onPress={() => Linking.openURL(orphanData?.socialStudyUrl)}
        >
          <Text style={styles.linkText}>اضغط هنا</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RowForBillTable = ({ billData, rowIndex }) => {
  const rowStyle = rowIndex % 2 === 0 ? styles.whiteRow : styles.greyRow;

  return (
    <View style={[styles.row, rowStyle]}>
      <View style={styles.cell}>
        <Text>{rowIndex + 1}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{billData?.payments}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{billData?.description}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{new Date(billData?.date).toLocaleDateString()} </Text>
      </View>
      <View style={styles.cell}>
        <TouchableOpacity
          onPress={() => Linking.openURL(billData?.billFileUrl)}
        >
          <Text style={styles.linkText}>اضغط هنا</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
