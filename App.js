import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import LoginComponent from "./Login/LoginComponent";
import SignupComponent from "./Signup/SignupComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { firebase } from "./firebase_config";
import Navigator from "./Navigation/Navigator";
import ProfileScreen from "./Screens/ProfileAllPost/ProfileScreen";
import SinglePostScreen from "./Screens/SinglePost/SinglePostScreen";
import HomeScreen from "./Screens/HomeFeed/HomeScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginComponent}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignupComponent}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Homepage"
            component={Navigator}
            // name="BottomTabs"
            // component={BottomTabs}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="SinglePost"
            component={SinglePostScreen}
            options={{ headerShown: false }}
            name="Setting"
            component={EditProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
