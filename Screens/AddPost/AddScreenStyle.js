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
    borderTopWidth: 2,
    borderTopColor: "#8a5a44",
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
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageBox: {
    width: 200,
    height: 200,
    paddingTop: 20,
  },
  bottomSpaceAdjust: {
    marginTop: 80,
  },
});

export default styles;
