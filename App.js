import React from "react";
import { Button, ImageBackground, Text, SafeAreaView } from "react-native";
import LoginComponent from "./Login/LoginComponent";

export default function App() {
  return (
    <SafeAreaView>
      {/* <Text>Hello World</Text>
      <Text>This is a test</Text>
      <Text>Lets make this work</Text> */}
      <LoginComponent />
    </SafeAreaView>
  );
}
