import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Pressable,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase_config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore";
import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { BookmarksContext } from "../../Navigation/Navigator";
import RecipeCard from "../RecipeCardForHomeAndBookmarks/RecipeCard";

const HomeScreen = ({ navigation, loggedInUser, refresh, recipes, bookmarkPressed }) => {


  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable titleSize={20} style={styles.button}
            onPress={refresh}>
            {/* <Text style={styles.buttonText}> Refresh Page </Text> */}
            <MaterialIcons name="refresh" size={50} color="black" />
          </Pressable>
          <View>
            <Text>All public recipes in order of time of creation:</Text>
            {recipes ?
              recipes.map((recipe, index) => (
                <View key={index}>
                  <RecipeCard
                    navigation={navigation}
                    recipe={recipe}
                    index={index}
                    loggedInUser={loggedInUser}
                    bookmarkPressed={bookmarkPressed}
                     />
                </View>
              )) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0096F6",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  userinfo: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
    borderTopWidth: 1,
  },
  username: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    marginLeft: 30,
    width: 330,
    height: 200,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 23,
    marginRight: 30,
    marginTop: 10,
  },
  imageAndEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  recipe: {
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "flex-start",

    // borderBottomColor: "black",
    // borderBottomWidth: 1,
  },
  title: {
    marginHorizontal: 30,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  recipeInfo: {
    marginTop: 10,
    marginBottom: 10,
  },

  userImg: {
    height: 80,
    width: 80,
    borderRadius: 75,
  },
});
