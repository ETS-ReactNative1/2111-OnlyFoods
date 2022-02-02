import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ChatScreen from "../Screens/ChatScreen";
import BookmarkScreen from "../Screens/BookmarkScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          top: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "white",
          height: 50,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={40}
                color="black"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-chatbubble-ellipses-outline"
              size={40}
              color="white"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TopTabs;
