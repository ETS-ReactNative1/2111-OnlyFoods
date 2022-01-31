import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

function LoginComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <Image
            source={{
              uri: "https://uspto.report/TM/90307472/mark.png",
              height: 150,
              width: 150,
            }}
          />
          {/* <Text>OnlyFoods</Text> */}
        </View>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Username or Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
          />

          <View />
        </View>
      </View>
      <View style={styles.input}>
        <TextInput
          placeholderTextColor="#444"
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
        />
      </View>
      <Pressable
        titleSize={20}
        style={styles.button}
        onPress={() => console.log("pressed login!")}
      >
        <Text style={styles.buttonText}> Log In </Text>
      </Pressable>
      <View style={styles.signupContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  wrapper: {
    marginTop: 80,
  },
  input: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#0096F6",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
});

export default LoginComponent;
