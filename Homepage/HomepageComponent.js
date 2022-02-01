import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { firebase } from "../firebase_config";
import styles from "./HomepageStyles";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";

const Homepage = ({ navigation }) => {
  const auth = getAuth(firebase);
  let user = auth.currentUser;

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.buttonText}>LoggedIn {user.email}</Text>

        <Pressable
          titleSize={20}
          style={styles.button}
          onPress={() => {
            signOut(auth);
            navigation.replace("Login");
          }}
        >
          <Text style={styles.buttonText}> Log Out </Text>
        </Pressable>
      </View>
      <FooterComponent />
    </View>
  );
};

export default Homepage;
