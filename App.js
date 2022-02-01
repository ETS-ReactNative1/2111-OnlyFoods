import React, { useEffect, useState } from 'react'
import { Button, ImageBackground, Text, SafeAreaView, View } from "react-native";
import LoginComponent from "./Login/LoginComponent";
import SignupComponent from "./Signup/SignupComponent";
import Homepage from './Homepage/HomepageComponent';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import { LoginScreen, HomeScreen, RegistrationScreen } from './screens'
import { getAuth } from "firebase/auth";
import { firebase } from "./firebase_config";


// import {decode, encode} from 'base-64'
// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();

export default function App() {

  // const [loading, setLoading] = useState(true)
  // const [user, setUser] = useState(null)

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupComponent} />
          <Stack.Screen options={{ headerShown: false }} name="Homepage" component={Homepage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
