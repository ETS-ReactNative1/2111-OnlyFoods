import React, { useEffect, useState } from "react";
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
} from "firebase/firestore";
import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

const HomeScreen = ({ navigation, loggedInUser, bookmarks }) => {
  const recipesRef = collection(db, "recipes");

  const recipesQuery = query(
    recipesRef,
    where("Public", "==", true),
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
  const [foodColor, setFoodColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(false);

  const foodPressed = () => {
    setFoodColor(!foodColor);
  };
  const bookmarkPressed = () => {
    setBookmarkColor(!bookmarkColor);
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable titleSize={20} style={styles.button} onPress={refresh}>
            {/* <Text style={styles.buttonText}> Refresh Page </Text> */}
            <MaterialIcons name="refresh" size={50} color="black" />
          </Pressable>
          <View>
            <Text>All public recipes in order of time of creation:</Text>
            {recipes.map((recipe, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("SinglePost", {
                    LoggedInUser: loggedInUser.Username,
                    RecipeUsername: recipe.CreatorUsername,
                    RecipeName: recipe.Name,
                    TimeHrs: recipe.Time.Hours,
                    TimeMins: recipe.Time.Minutes,
                    Description: recipe.Description,
                    Ingredients: recipe.Ingredients,
                    Instructions: recipe.Instructions,
                  })
                }
              >
                <View style={styles.userinfo}>
                  <Image
                    style={styles.userImg}
                    source={require("../../Assets/Cook1.png")}
                  />
                  <View style={styles.username}>
                    <Text> {recipe.CreatorUsername} </Text>
                  </View>
                </View>

                <View style={styles.imageAndEdit}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
                    }}
                  />
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity onPress={() => bookmarkPressed()}>
                    <Feather
                      name="bookmark"
                      size={40}
                      color={bookmarkColor ? "red" : "black"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => foodPressed()}>
                    <MaterialCommunityIcons
                      name="food-fork-drink"
                      size={40}
                      color={foodColor ? "green" : "black"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.recipe}>
                  <View style={styles.recipeInfo}>
                    <Text
                      style={{
                        textDecorationLine: "underline",
                        alignItems: "center",
                      }}
                    >
                      {recipe.Name}
                    </Text>
                  </View>
                  <View style={styles.recipeInfo}>
                    <Text>
                      Cook Time: {recipe.Time.Hours}hrs {recipe.Time.Minutes}
                      mins
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
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
