import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React from "react";

const FooterComponent = () => {
  return (
    <>
      <View style={styles.mainFooter}>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.eachBtn}>
            <AntDesign name="home" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.eachBtn}>
            <Ionicons name="ios-search" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.eachBtn}>
            <Ionicons name="add-circle-outline" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.eachBtn}>
            <AntDesign name="user" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainFooter: {
    bottom: 20,
    position: "absolute",
    flexDirection: "row",
  },
  footerContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  eachBtn: {
    marginHorizontal: 30,
  },
});

export default FooterComponent;
