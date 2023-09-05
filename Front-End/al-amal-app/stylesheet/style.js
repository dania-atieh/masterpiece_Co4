const React = require("react-native");
import colors from "./theme";

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
    color: colors.primary,
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    textAlign: "right",
    height: 50,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "white",
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 330,
    alignItems: "center",
  },
  errorText: {
    color: "red", // Change this line to set the color to red
    fontSize: 14,
    marginTop: 5,
  },
  checkboxContainer: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    marginRight: 10,
    marginTop: 20,
  },
  checkbox: {
    width: 12,
    height: 12,
    backgroundColor: "transparent",
  },
  checked: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 40,
  },
  description: {
    fontSize: 17,
    textAlign: "right",
    paddingHorizontal: 40,
  },
  textInput: {
    textAlign: "right",
    height: 50,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingRight: 10,
    marginHorizontal: 40,
  },
  radioContainer: {
    marginEnd: 15,
    flexDirection: "row",
    justifyContent: "flex-end", // Align to the flex end (right side)
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16, // Adjust the spacing between Male and Female
  },
  radioLabel: {
    textAlign: "right",
    fontSize: 16,
    marginLeft: 8,
  },
  link: {
    fontSize: 16,
    color: "blue", // Set the text color to blue
    textDecorationLine: "underline", // Add underline to text
    textAlign: "right", // Align the text to the right
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 45,
    marginBottom: -10,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  middle: {
    flex: 2,
    alignItems: "center",
  },
  right: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 1, // Set the thickness of the line
    borderBottomColor: colors.secondary, // Set the color of the line
    width: "80%",
    marginStart: 45,
  },
  table: {
    flexDirection: 'column',
    paddingHorizontal: 40,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    minWidth: 100,
    textAlign: "right", 
  },
  headerRow: {
    backgroundColor: colors.primary,
  },
  whiteRow: {
    backgroundColor: 'white',
  },
  greyRow: {
    backgroundColor: 'grey',
  },
  linkCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  coursesFlatlistContainer:{
    height: 900,
    marginTop: 20,
    marginBottom:100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
