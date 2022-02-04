import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import BookmarkScreen from "../Screens/BookmarkScreen";
import AddScreen from "../Screens/AddScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import HomeScreenTest from "../Screens/HomeScreenTest";
import ProfileScreenTest from "../Screens/ProfileScreenTest";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
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
        // component={HomeScreen}
        component={HomeScreenTest}
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
        component={BookmarkScreen}
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
        component={AddScreen}
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
        // component={ProfileScreen}
        component={ProfileScreenTest}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={35}
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
