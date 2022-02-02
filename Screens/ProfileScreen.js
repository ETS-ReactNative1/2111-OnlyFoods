import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Profile Screen" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
