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
import { BookmarksContext } from '../../App'
import { BKRefContext } from '../../Navigation/Navigator'

const RecipeCard = ({navigation, recipe, index, loggedInUser}) => {

  const { bookmarks, setBookmarks } = useContext(BookmarksContext)
  const { BKRef, setBKRef } = useContext(BKRefContext)
  const [foodColor, setFoodColor] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [recipeCardBookmarks, setRecipeCardBookmarks] = useState(null)

  const foodPressed = () => {
    setFoodColor(!foodColor);
  };

  const bookmarkPressedRecipeCard = (recipe) => {
    const recipesArrCopy = recipeCardBookmarks.BookmarkedRecipes.slice()

    if(bookmarked) {
      const unBookmark = recipesArrCopy.filter( (bookmark) => {
        return (bookmark.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds || bookmark.Creator !== recipe.Creator)
      })

      updateDoc(BKRef, {BookmarkedRecipes: unBookmark})
      setRecipeCardBookmarks({...bookmarks, BookmarkedRecipes: unBookmark})
      setBookmarks({...bookmarks, BookmarkedRecipes: unBookmark})
    } else {
      recipesArrCopy.push(recipe)
      updateDoc(BKRef, {BookmarkedRecipes: recipesArrCopy})
      setRecipeCardBookmarks({...bookmarks, BookmarkedRecipes: recipesArrCopy})
      setBookmarks({...bookmarks, BookmarkedRecipes: recipesArrCopy})
    }

    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    if(bookmarks) {
      setRecipeCardBookmarks(bookmarks)
      const recipesArrCopy = bookmarks.BookmarkedRecipes.slice()

      const hasRecipe = recipesArrCopy.some((bookmark) => {
        return (bookmark.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds && bookmark.Creator === recipe.Creator)
      })

      if(hasRecipe) setBookmarked(true)
    }

  }, [bookmarks])

  return (
    <>
      <SafeAreaView style={styles.container}>
          <View>
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
                    ImageURL: recipe.ImageURL,
                    bookmarked,
                    //bookmarkPressed: bookmarkPressed,
                    //updateBookmarks: ()=>bookmarkPressedRecipeCard (recipe),
                    recipe,
                    bookmarks,
                    loggedInUser,
                    setRecipeCardBookmark: () => setBookmarked(!bookmarked)
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
                      uri: recipe.ImageURL,
                    }}
                  />
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity onPress={() => bookmarkPressedRecipeCard(recipe)}>
                    <Feather
                      name="bookmark"
                      size={40}
                      color={bookmarked ? "red" : "black"}
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
          </View>
      </SafeAreaView>
    </>
  );
};

export default RecipeCard;

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
