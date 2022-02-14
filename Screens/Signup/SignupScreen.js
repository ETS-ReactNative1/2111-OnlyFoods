import React, { useState, useContext } from "react";
import { auth, db } from "../../firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { BookmarksContext } from "../../App";

function SignupScreen({ navigation }) {
  const { bookmarks, setBookmarks } = useContext(BookmarksContext);
  const bookmarksRef = collection(db, "bookmarks");

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
          addDoc(bookmarksRef, {
            UserID: user.uid,
            BookmarkedRecipes: [],
            CookedRecipes: [],
          }).then((userBookmarkRef) => {
            getDoc(userBookmarkRef).then((snap) => {
              setBookmarks(snap.data());
            });
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
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(230, 230, 230, 0.716)",
      }}
      keyboardShouldPersistTaps="always"
    >
      <ImageBackground
        source={require("../../Assets/background.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "95%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.logo}>
              <Image
                style={{ width: 150, height: 150, marginBottom: 30 }}
                source={require("../../Assets/LOGO.png")}
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
          <Pressable
            titleSize={20}
            style={styles.button}
            onPress={handleSignup}
          >
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
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: -10,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
    marginTop: -120,
  },
  wrapper: {
    marginTop: 80,
  },
  input: {
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 30,
  },
});
