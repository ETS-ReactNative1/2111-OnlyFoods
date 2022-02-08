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
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase_config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const ProfileScreen = ({ navigation, loggedInUser }) => {
  //const user = auth.currentUser
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
          snapRecipes.push(doc.data());
        });
        setRecipes(snapRecipes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={{ fontSize: 15 }}>Recipes</Text>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Setting", {
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
        <TouchableOpacity
          titleSize={20}
          style={styles.button}
          onPress={refresh}
        >
          <Text style={styles.buttonText}> Refresh Page </Text>
        </TouchableOpacity>

        <View style={styles.images}>
          {recipes.map((recipe, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("SinglePost", {
                  LoggedInUser: loggedInUser.Username,
                  RecipeUsername: recipe.CreatorUsername,
                  RecipeImage: recipe.ImageURL,
                  RecipeName: recipe.Name,
                  TimeHrs: recipe.Time.Hours,
                  TimeMins: recipe.Time.Minutes,
                  Description: recipe.Description,
                  Ingredients: recipe.Ingredients,
                  Instructions: recipe.Instructions,
                  ImageURL: recipe.ImageURL,
                  recipe,
                  loggedInUser,
                })
              }
            >
              <Image style={styles.img} source={{ uri: recipe.ImageURL }} />
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
    backgroundColor: "white",
    marginHorizontal: 30,
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
    marginLeft: 50,
    alignItems: "center",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "space-between",
    marginTop: 20,
  },

  img: {
    height: 100,
    width: 100,
    marginBottom: 10,
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
});
