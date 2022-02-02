import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Home Screen" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
