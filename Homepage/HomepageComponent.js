import React, { useEffect, useState } from 'react'
import { Button, ImageBackground, Text, SafeAreaView, View, Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { firebase } from "../firebase_config";
import styles from './HomepageStyles'


const Homepage = ({navigation}) => {
  const auth = getAuth(firebase)
  let user = auth.currentUser;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>LoggedIn {user.email}</Text>

      <Pressable
        titleSize={20}
        style={styles.button}
        onPress={() => {
          signOut(auth)
          navigation.replace('Login')
        }}
      >
        <Text style={styles.buttonText}> Log Out </Text>
      </Pressable>
    </View>
  )
}

export default Homepage
