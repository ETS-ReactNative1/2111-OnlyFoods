import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import HomeScreen from "../Screens/HomeFeed/HomeScreen";
import BookmarkScreen from "../Screens/Bookmark/BookmarkScreen";
import AddPostScreen from "../Screens/AddPost/AddPostScreen";
import ProfileScreen from "../Screens/ProfileAllPost/ProfileScreen";
import SinglePostScreen from "../Screens/SinglePost/SinglePostScreen";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  const user = auth.currentUser;

  const usersRef = collection(db, "user");
  const userQuery = query(usersRef, where("Email", "==", user.email));
  //console.log('loggedin, uid:', user.uid)

  const refresh = () => {
    getDocs(userQuery)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setLoggedInUser(doc.data());
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: "black",
          borderRadius: 13,
          height: 60,
          ...style.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <HomeScreen {...props} loggedInUser={loggedInUser} />
        )}
        // component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="home"
                size={35}
                color={focused ? "rgb(71, 190, 255)" : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        children={(props) => (
          <BookmarkScreen {...props} loggedInUser={loggedInUser} />
        )}
        // component={BookmarkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={40}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Post"
        children={(props) => (
          <AddPostScreen {...props} loggedInUser={loggedInUser} />
        )}
        // component={AddScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle-outline"
              size={37}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={(props) => (
          <ProfileScreen {...props} loggedInUser={loggedInUser} />
        )}
        // component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={35}
              color={focused ? "rgb(71, 190, 255)" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SinglePost"
        component={SinglePostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="file1"
              size={24}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabs;
