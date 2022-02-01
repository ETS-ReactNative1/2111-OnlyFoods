import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import FooterComponent from "../Footer/FooterComponent";

const NavbarComponent = () => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={40}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              OnlyFoods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="md-chatbubble-ellipses-outline"
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {/* FOOTER */}
      </View>
      <FooterComponent />
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 150,
    resizeMode: "contain",
    alignSelf: "center",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  mainContainer: {
    borderColor: "black",
    borderBottomWidth: 1,
  },
});

export default NavbarComponent;
