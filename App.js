import React from "react";
import {
  Button,
  ImageBackground,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import LoginComponent from "./Login/LoginComponent";
import NavbarComponent from "./Navbar/NavbarComponent";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Hello World</Text>
      <Text>This is a test</Text>
      <Text>Lets make this work</Text> */}
      {/* <LoginComponent /> */}
      <NavbarComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
