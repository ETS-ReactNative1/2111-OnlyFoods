import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
      <Button title="Chat Screen" onPress={() => alert("Button Clicked")} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
