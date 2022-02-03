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
import BottomTabs from "./Navigation/BottomTabs";
import ProfileScreen from "./Screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function App() {
  // const [loading, setLoading] = useState(true)
  // const [user, setUser] = useState(null)

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
            component={BottomTabs}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
