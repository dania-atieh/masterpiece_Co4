import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../stylesheet/theme";
import styles from "../stylesheet/style";
import Header from "../components/Header";
import { RadioButton } from "react-native-paper";

const OrphanInfo = () => {
  // Sample data for the table
  const tableData = [
    ["صورة", "مقبوضات", "البيان", "التاريخ", "رقم"],
    ["Data 1", "Data 2", "Data 3", "Data 4", ""],
    ["Data 1", "Data 2", "Data 3", "Data 4", ""],
  ];

  const renderRow = (rowData, rowIndex) => {
    const rowStyle =
      rowIndex === 0
        ? styles.headerRow
        : rowIndex % 2 === 0
        ? styles.greyRow
        : styles.whiteRow;
    return (
      <View key={rowIndex} style={[styles.row, rowStyle]}>
        {rowData.map((cellData, cellIndex) => (
          <View
            key={cellIndex}
            style={[
              styles.cell,
              cellIndex === rowData.length - 1 && styles.linkCell,
            ]}
          >
            {cellIndex === rowData.length - 1 && cellData ? (
              <TouchableOpacity onPress={() => Linking.openURL(cellData)}>
                <Text style={styles.linkText}>صورة</Text>
              </TouchableOpacity>
            ) : (
              <Text>{cellData}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "white", height: 900 }}>
      <Header name="الرئيسية" />
      <Text style={styles.headerTitle}>الأيتام:</Text>

      <Text style={styles.headerTitle}>الفواتير:</Text>
      <ScrollView horizontal>
        <View style={styles.table}>
          {tableData.map((rowData, rowIndex) => renderRow(rowData, rowIndex))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrphanInfo;
