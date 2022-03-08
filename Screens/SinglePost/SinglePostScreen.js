import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  Fontisto,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { db } from "../../firebase_config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  doc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { BookmarksContext } from "../../App";
import CachedImage from "react-native-expo-cached-image";

const SinglePostScreen = ({ navigation: { goBack }, navigation, route }) => {
  if (!route.params.recipe) {
    const recipe = {
      CreatedAt: route.params.CreatedAt,
      Creator: route.params.Creator,
      CreatorUsername: route.params.CreatorUsername,
      Description: route.params.Description,
      ImageURL: route.params.ImageURL,
      Ingredients: route.params.Ingredients,
      Instructions: route.params.Instructions,
      RecipeName: route.params.RecipeName,
      Public: route.params.Public,
      Time: route.params.Time,
    };
  }

  const [cooked, setCooked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const bookmarksRef = collection(db, "bookmarks");

  const { bookmarks, setBookmarks } = useContext(BookmarksContext);
  const [userBookmarksRef, setUserBookmarksRef] = useState("");

  const bookmarkPressed = (recipe) => {
    const recipesArrCopy = bookmarks.BookmarkedRecipes.slice();

    const hasRecipe = recipesArrCopy.some((bookmark) => {
      return (
        bookmark.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
        bookmark.Creator === recipe.Creator
      );
    });

    if (hasRecipe) {
      const unBookmark = recipesArrCopy.filter((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
          bookmark.Creator !== recipe.Creator
        );
      });

      updateDoc(userBookmarksRef, { BookmarkedRecipes: unBookmark });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: unBookmark });
      if (route.params.setRecipeCardBookmark)
        route.params.setRecipeCardBookmark();
      setBookmarked(!bookmarked);
    } else {
      recipesArrCopy.push(recipe);
      updateDoc(userBookmarksRef, { BookmarkedRecipes: recipesArrCopy });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: recipesArrCopy });
      if (route.params.setRecipeCardBookmark)
        route.params.setRecipeCardBookmark();
      setBookmarked(!bookmarked);
    }
  };

  const foodPressed = (recipe) => {
    let recipesArrCopy = [];

    if (bookmarks.CookedRecipes)
      recipesArrCopy = bookmarks.CookedRecipes.slice();

    const hasRecipe = recipesArrCopy.some((bookmark) => {
      return (
        bookmark.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
        bookmark.Creator === recipe.Creator
      );
    });

    if (hasRecipe) {
      const unCook = recipesArrCopy.filter((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
          bookmark.Creator !== recipe.Creator
        );
      });

      updateDoc(userBookmarksRef, { CookedRecipes: unCook });
      setBookmarks({ ...bookmarks, CookedRecipes: unCook });
      if (route.params.setRecipeCardCooked) route.params.setRecipeCardCooked();
      setCooked(!cooked);
    } else {
      recipesArrCopy.push(recipe);
      updateDoc(userBookmarksRef, { CookedRecipes: recipesArrCopy });
      setBookmarks({ ...bookmarks, CookedRecipes: recipesArrCopy });
      if (route.params.setRecipeCardCooked) route.params.setRecipeCardCooked();
      setCooked(!cooked);
    }
  };

  useEffect(() => {
    getDocs(
      query(
        bookmarksRef,
        where("UserID", "==", route.params.loggedInUser.UserId)
      )
    ).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        setUserBookmarksRef(document.ref);
        setBookmarks(document.data());
      });
    });

    if (route.params.bookmarked !== undefined) {
      setBookmarked(route.params.bookmarked);
    } else if (bookmarks) {
      const hasRecipe = bookmarks.BookmarkedRecipes.some((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds ===
            route.params.recipe.CreatedAt.nanoseconds &&
          bookmark.Creator === route.params.recipe.Creator
        );
      });

      if (hasRecipe) {
        setBookmarked(true);
      }
    }

    if (route.params.cooked !== undefined) {
      setCooked(route.params.cooked);
    } else if (bookmarks) {
      const hasRecipe = bookmarks.CookedRecipes.some((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds ===
            route.params.recipe.CreatedAt.nanoseconds &&
          bookmark.Creator === route.params.recipe.Creator
        );
      });

      if (hasRecipe) {
        setCooked(true);
      }
    }
  }, []);

  return (
    <>
      <View
        style={{
          backgroundColor: "#fae1dd",
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => goBack()}
          title="Back"
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            alignItems: "center",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {route.params.RecipeName}
        </Text>
        <View>
          {route.params.LoggedInUser === route.params.RecipeUsername ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("EditPost", route.params)}
            >
              <Feather name="edit-2" size={24} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View
        style={{ alignItems: "center", backgroundColor: "rgb(240, 216, 206)" }}
      >
        <CachedImage
          style={styles.image}
          source={
            route.params.recipe.ImageURL
              ? { uri: route.params.recipe.ImageURL }
              : { uri: "https://i.imgur.com/tIrGgMa.png" }
          }
        />
      </View>
      <View style={styles.imageAndUsername}>
        <Image
          style={styles.userImg}
          source={require("../../Assets/Cook1.png")}
        />
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            backgroundColor: "#fae1dd",
          }}
        >

          <Text style={{ color: "gray" }}>Recipe By:</Text>
          <Text style={{ fontWeight: "bold" }}>
            {route.params.RecipeUsername}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",

            marginHorizontal: 80,
            marginVertical: 10,
            paddingLeft: 90,
            backgroundColor: "#fae1dd",

          }}
        >
          <TouchableOpacity onPress={() => foodPressed(route.params.recipe)}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={35}

              color={cooked ? "#2d6a45" : "black"}

            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => bookmarkPressed(route.params.recipe)}

            style={{ paddingHorizontal: 20 }}

          >
            <Fontisto
              name="bookmark-alt"
              size={33}

              color={bookmarked ? "#c9184a" : "black"}

            />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.ingredients}>
            <View style={styles.listTitle}>
              <Text style={styles.textTitle}>Description:</Text>

              <View
                style={{
                  paddingRight: 90,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textTransform: "capitalize",
                    flexWrap: "wrap",
                    marginRight: 90,
                    paddingTop: 2,
                  }}
                >
                  {route.params.Description}
                </Text>
              </View>

            </View>
          </View>
          <View style={styles.ingredients}>
            <View style={styles.listTitle}>
              <Text style={styles.textTitle}>Ingredients:</Text>

              <Text style={{ fontSize: 17, color: "gray" }}>
                {route.params.Ingredients.length} Items
              </Text>
            </View>
            {route.params.Ingredients.map((ingredient) => (
              <View style={styles.list}>
                <Text
                  key={route.params.Ingredients.indexOf(ingredient)}
                  style={styles.text}
                >
                  {ingredient.Name}
                </Text>
                <Text style={styles.text}>
                  {ingredient.Quantity} {ingredient.Unit}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.ingredients}>
            <View style={styles.listTitle}>
              <Text style={styles.textTitle}>Directions:</Text>
              <Text style={{ fontSize: 17, color: "gray" }}>
                {route.params.Instructions.length} Steps
              </Text>
            </View>
            {route.params.Instructions.map((instruction) => (
              <View style={styles.list}>
                <Text
                  key={route.params.Instructions.indexOf(instruction)}
                  style={styles.text}
                >
                  <Text style={{ textDecorationLine: "underline" }}>
                    Step {route.params.Instructions.indexOf(instruction) + 1}:
                  </Text>
                  <Text>
                    {"  "} {instruction}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SinglePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fae1dd",

  },
  userinfo: {
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
  },
  username: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center",
    marginHorizontal: 10,
    marginVertical: 0,
  },
  image: {
    width: "100%",
    height: 350,
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 23,
    marginRight: 30,
    marginTop: 20,
  },
  imageAndEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fire: {
    marginTop: 40,
    marginEnd: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  recipe: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  title: {
    marginHorizontal: 30,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  recipeInfo: {
    marginTop: 5,
    marginBottom: 5,
  },
  edit: {
    marginBottom: 10,
    alignItems: "flex-end",
    marginRight: 30,
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 75,
    marginTop: 5,
  },
  back: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "gray",
  },
  ingredients: {
    marginHorizontal: 10,
    borderWidth: 1,
  },
  listTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    textTransform: "capitalize",
    marginBottom: 5,

    marginHorizontal: 5,

  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 5,

  },
  text: {
    fontSize: 17,
    textTransform: "capitalize",
    paddingBottom: 10,

    marginHorizontal: 5,

  },
  textTitle: {
    fontSize: 17,
    textTransform: "capitalize",
    fontWeight: "bold",
    paddingBottom: 5,

    marginHorizontal: 5,
  },
  imageAndUsername: {
    flexDirection: "row",
    marginBottom: 0,
    backgroundColor: "#fae1dd",
    paddingLeft: 10,
    paddingBottom: 10,

  },
});
