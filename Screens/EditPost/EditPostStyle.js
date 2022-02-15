import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  container: {
    backgroundColor: "#fae1dd",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  wrapper: {
    marginTop: 10,
  },
  input: {
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: {
    marginTop: 30,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 10,
  },
  buttonOne: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "red",
  },

  buttonTextOne: {
    fontWeight: "600",
    color: "red",
    fontSize: 20,
  },
  buttonTextTwo: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageBox: {
    width: 300,
    height: 300,
  },
  bottomSpaceAdjust: {
    marginTop: 40,
  },
  topSpaceAdjust: {
    marginTop: 20,
  },
  back: {
    marginLeft: 20,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default styles;
