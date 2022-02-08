import React, { useEffect, useState, useContext, createContext } from "react";
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
import LoginScreen from "./Screens/Login/LoginScreen";
import SignupScreen from "./Screens/Signup/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { firebase } from "./firebase_config";
import Navigator from "./Navigation/Navigator";
import ProfileScreen from "./Screens/ProfileAllPost/ProfileScreen";
import SinglePostScreen from "./Screens/SinglePost/SinglePostScreen";
import HomeScreen from "./Screens/HomeFeed/HomeScreen";
// import EditProfileScreen from "./Screens/EditProfile/EditProfileScreen";

const Stack = createNativeStackNavigator();
export const BookmarksContext = createContext('bookmarks');

function App() {
  const [bookmarks, setBookmarks] = useState(null)
  const value = { bookmarks, setBookmarks}

  return (
    <>
    <BookmarksContext.Provider value={value}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Navigator"
            component={Navigator}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="SinglePost"
            component={SinglePostScreen}
            // options={{ headerShown: false }}
            // name="Setting"
            // component={EditProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>

      </BookmarksContext.Provider>
    </>
  );
}

export default App;
