import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
      <Button title="Search Screen" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
