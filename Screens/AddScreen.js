import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const AddScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Add Screen</Text>
      <Button title="Add Post Screen" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
