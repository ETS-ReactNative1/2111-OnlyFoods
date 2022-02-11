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
  updateDoc,
} from "firebase/firestore";
import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { BookmarksContext } from "../../App";
import { BKRefContext } from "../../Navigation/Navigator";
import CachedImage from 'react-native-expo-cached-image';

const RecipeCard = ({ navigation, recipe, index, loggedInUser }) => {

  const { bookmarks, setBookmarks } = useContext(BookmarksContext);
  const { BKRef, setBKRef } = useContext(BKRefContext);
  const [cooked, setCooked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [recipeCardBookmarks, setRecipeCardBookmarks] = useState(null);
  //const [ImageURL, setImageURL] = useState("");

  const foodPressed = () => {
    let recipesArrCopy = []

    if(recipeCardBookmarks.CookedRecipes) {
      recipesArrCopy = recipeCardBookmarks.CookedRecipes.slice()
    }

    if(cooked) {
      const unCooked = recipesArrCopy.filter((cooked) => {
        return (
          cooked.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
          cooked.Creator !== recipe.Creator
        );
      });

      updateDoc(BKRef, { CookedRecipes: unCooked });
      setRecipeCardBookmarks({ ...bookmarks, CookedRecipess: unCooked });
      setBookmarks({ ...bookmarks, CookedRecipes: unCooked });

    } else {
      recipesArrCopy.push(recipe);
      updateDoc(BKRef, { CookedRecipes: recipesArrCopy });
      setRecipeCardBookmarks({
        ...bookmarks,
        CookedRecipes: recipesArrCopy,
      });
      setBookmarks({ ...bookmarks, CookedRecipes: recipesArrCopy });
    }

    setCooked(!cooked);
  };

  const bookmarkPressedRecipeCard = (recipe) => {
    const recipesArrCopy = recipeCardBookmarks.BookmarkedRecipes.slice();

    if (bookmarked) {
      const unBookmark = recipesArrCopy.filter((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
          bookmark.Creator !== recipe.Creator
        );
      });

      updateDoc(BKRef, { BookmarkedRecipes: unBookmark });
      setRecipeCardBookmarks({ ...bookmarks, BookmarkedRecipes: unBookmark });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: unBookmark });
    } else {
      recipesArrCopy.push(recipe);
      updateDoc(BKRef, { BookmarkedRecipes: recipesArrCopy });
      setRecipeCardBookmarks({
        ...bookmarks,
        BookmarkedRecipes: recipesArrCopy,
      });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: recipesArrCopy });
    }

    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    if (bookmarks) {
      setRecipeCardBookmarks(bookmarks);
      const recipesArrCopy = bookmarks.BookmarkedRecipes.slice();

      let cookedRecs = []
      if(bookmarks.CookedRecipes) {
        cookedRecs = bookmarks.CookedRecipes.slice()
      }

      const hasRecipe = recipesArrCopy.some((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
          bookmark.Creator === recipe.Creator
        );
      });

      const cookedRecipe = cookedRecs.some((cookedR) => {
        return (
          cookedR.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
          cookedR.Creator === recipe.Creator
        );
      });

      if (hasRecipe) setBookmarked(true);
      if (cookedRecipe) setCooked(true)

      // if (recipe.ImageURL === "") {
      //   setImageURL("https://i.imgur.com/tIrGgMa.png");
      // } else {
      //   setImageURL(recipe.ImageURL);
      // }
    }
  }, [bookmarks]);

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
                Time: recipe.Time,
                Description: recipe.Description,
                Ingredients: recipe.Ingredients,
                Instructions: recipe.Instructions,
                bookmarked,
                Public: recipe.Public,
                docId: recipe.docId,
                cooked,
                //bookmarkPressed: bookmarkPressed,
                //updateBookmarks: ()=>bookmarkPressedRecipeCard (recipe),
                recipe,
                bookmarks,
                loggedInUser,
                setRecipeCardBookmark: () => setBookmarked(!bookmarked),
                setRecipeCardCooked: () => setCooked(!cooked)
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
              <CachedImage
                style={styles.image}
                source={recipe.ImageURL ? {uri: recipe.ImageURL} : { uri: "https://i.imgur.com/tIrGgMa.png"}}
              />
            </View>
            <View style={styles.icons}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: 16,
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: 5,
                  }}
                >
                  {recipe.Name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => foodPressed()}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={30}
                  color={cooked ? "red": "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => bookmarkPressedRecipeCard(recipe)}
              >
                <Fontisto
                  name="bookmark-alt"
                  size={35}
                  color={bookmarked ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.recipe}>
              {/* <View style={styles.recipeInfo}></View> */}
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
    backgroundColor: "rgba(230, 230, 230, 0.716)",
  },
  userinfo: {
    backgroundColor: "rgba(230, 230, 230, 0.716)",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 10,
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
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
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
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
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
