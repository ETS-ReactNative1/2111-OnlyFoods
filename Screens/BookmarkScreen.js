import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const BookmarkScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Bookmark Screen</Text>
      <Button title="Bookmark Screen" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
