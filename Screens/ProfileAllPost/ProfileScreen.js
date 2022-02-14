import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { db } from "../../firebase_config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackRouter } from "react-navigation";
import CachedImage from "react-native-expo-cached-image";
// import EditProfileScreen from "../EditProfile/EditProfileScreen";

const ProfileScreen = ({ navigation, loggedInUser }) => {
  const recipesRef = collection(db, "recipes");
  const recipesQuery = query(
    recipesRef,
    where("Creator", "==", loggedInUser["UserId"]),
    orderBy("CreatedAt", "desc")
  );

  const [recipes, setRecipes] = useState([]);

  const refresh = () => {
    getDocs(recipesQuery)
      .then((snapshot) => {
        let snapRecipes = [];
        snapshot.docs.forEach((doc) => {
          snapRecipes.push({ ...doc.data(), docId: doc.id });
        });
        // console.log("fromprofile",snapRecipes);
        setRecipes(snapRecipes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(240, 216, 206)" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.refresh} onPress={refresh}>
          <MaterialIcons name="refresh" size={30} />
        </TouchableOpacity>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Image
              style={styles.userImg}
              source={require("../../Assets/Cook1.png")}
            />
            <Text style={styles.userName}>{loggedInUser.Username}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {recipes.length}
            </Text>
            <Text style={{ fontSize: 20 }}>Recipes</Text>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfileScreen", {
                  LoggedInUsername: loggedInUser.Username,
                  LoggedInUserId: loggedInUser.UserId,
                  LoggedInEmail: loggedInUser.Email,
                })
              }
            >
              <AntDesign name="setting" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* lines below are to check that firestore queries work */}

        <View style={styles.images}>
          {recipes.map((recipe, index) => (
            <Pressable
              key={index}
              style={styles.singleImage}
              onPress={() =>
                navigation.navigate("SinglePost", {
                  LoggedInUser: loggedInUser.Username,
                  RecipeUsername: recipe.CreatorUsername,
                  RecipeName: recipe.Name,
                  Time: recipe.Time,
                  Description: recipe.Description,
                  Ingredients: recipe.Ingredients,
                  Instructions: recipe.Instructions,
                  ImageURL: recipe.ImageURL,
                  Public: recipe.Public,
                  recipe,
                  loggedInUser,
                  docId: recipe.docId,
                })
              }
            >
              <CachedImage
                style={styles.img}
                source={
                  recipe.ImageURL
                    ? { uri: recipe.ImageURL }
                    : { uri: "https://i.imgur.com/tIrGgMa.png" }
                }
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(240, 216, 206)",
    marginHorizontal: 20,
    marginTop: 10,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 75,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  userName: {
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 10,
  },
  userInfoItem: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 70,
  },
  userHeader: {
    flexDirection: "row",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 60,
    alignItems: "center",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "space-between",
    // marginVertical: 20,
    // marginHorizontal: 3,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
  },
  singleImage: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "space-between",
    marginVertical: 5,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    marginHorizontal: 7,
    borderColor: "gray",
  },
  img: {
    height: 110,
    width: 110,
  },

  refresh: {
    alignItems: "flex-end",
    marginRight: 5,
    justifyContent: "center",
  },
});
