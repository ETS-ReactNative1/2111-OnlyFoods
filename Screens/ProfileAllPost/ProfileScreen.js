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
        setRecipes(snapRecipes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fae1dd" }}>
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
    borderTopWidth: 2,
    borderTopColor: "#8a5a44",
    backgroundColor: "#fae1dd",
    marginHorizontal: 0,
    marginTop: 0,
    paddingLeft: 15,
  },
  userImg: {
    height: 80,
    width: 80,
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
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 15,
  },
  userInfoItem: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 90,
  },
  userHeader: {
    flexDirection: "row",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 80,
    alignItems: "center",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  singleImage: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
    marginHorizontal: 7,
    borderColor: "gray",
  },
  img: {
    height: 120,
    width: 115,
  },

  refresh: {
    alignItems: "flex-end",
    marginRight: 10,
    justifyContent: "center",
    marginTop: 15,
  },
});
