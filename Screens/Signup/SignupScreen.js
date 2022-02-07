import React, { useState } from "react";
import { auth, db } from "../../firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

function SignupScreen({ navigation }) {
  const usersRef = collection(db, "user");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          addDoc(usersRef, {
            Email: email,
            UserId: user.uid,
            Username: username,
          });
          navigation.replace("Navigator");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%", backgroundColor: "white" }}
      keyboardShouldPersistTaps="always"
    >
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
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#444"
              placeholder="Username: Max 8 characters"
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="username"
              autoFocus={true}
              maxLength={8}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#444"
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
            />
          </View>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor="#444"
            placeholder="Password: Min 6 characters"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <Pressable titleSize={20} style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}> Sign up </Text>
        </Pressable>
        <View style={styles.signupContainer}>
          <Text>Already have an account?</Text>
          <Pressable>
            <Text
              style={{ fontWeight: "bold", color: "dodgerblue" }}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

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