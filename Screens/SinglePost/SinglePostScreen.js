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
// import { CheckBox } from "@react-native-community/checkbox";
import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  Fontisto,
  MaterialIcons,
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

const SinglePostScreen = ({ navigation: { goBack }, route }) => {
  //console.log(route.params.bookmarked)
  // console.log(route.params);
  /*Route params are listed here for easy reference to render*/
  // RecipeUsername: recipe.CreatorUsername,
  // RecipeName: recipe.Name,
  // TimeHrs: recipe.Time.Hours,
  // TimeMins: recipe.Time.Minutes,
  // Description: recipe.Description,
  // Ingredients: recipe.Ingredients,
  // Instructions: recipe.Instructions,
  // LoggedInUser: loggedInUser.Username,
  // ImageURL: recipe.ImageURL

  const [foodColor, setFoodColor] = useState(false);
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
      //route.params.setRecipeCardBookmark()
      setBookmarked(!bookmarked);
    } else {
      recipesArrCopy.push(recipe);
      updateDoc(userBookmarksRef, { BookmarkedRecipes: recipesArrCopy });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: recipesArrCopy });
      if (route.params.setRecipeCardBookmark)
        route.params.setRecipeCardBookmark();
      //route.params.setRecipeCardBookmark()
      setBookmarked(!bookmarked);
    }
  };

  // const foodPressed = () => {
  //   setFoodColor(!foodColor);
  // };

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
    setBookmarked(route.params.bookmarked);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.back}>
            <Button onPress={() => goBack()} title="Back" />
          </TouchableOpacity>
          <View style={styles.userinfo}>
            <Image
              style={styles.userImg}
              source={require("../../Assets/Cook1.png")}
            />
            <View style={styles.username}>
              <Text> {route.params.RecipeUsername} </Text>
            </View>
            <View style={styles.edit}>
              {route.params.LoggedInUser === route.params.RecipeUsername ? (
                <Feather name="edit-2" size={24} />
              ) : null}
            </View>
          </View>

          <View style={styles.imageAndEdit}>
            <Image
              style={styles.image}
              source={{
                uri: route.params.ImageURL,
              }}
            />
          </View>
          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={40}
              color="rgba(230, 230, 230, 0.716)"
            />
            <TouchableOpacity
              onPress={() => bookmarkPressed(route.params.recipe)}
            >
              <Fontisto
                name="bookmark-alt"
                size={35}
                color={bookmarked ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.recipe}>
            <View style={styles.recipeInfo}>
              <Text
                style={{
                  alignItems: "center",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingTop: 15,
                }}
              >
                {route.params.RecipeName}
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text>
                Cook Time: {route.params.TimeHrs}hrs {route.params.TimeMins}mins
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={{ textTransform: "capitalize" }}>
                Description: {route.params.Description}
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text>Ingredients:</Text>
              {route.params.Ingredients.map((ingredient) => (
                <Text
                  key={route.params.Ingredients.indexOf(ingredient)}
                  style={{ textTransform: "capitalize" }}
                >
                  {/* Checkbox instead of view line 99*/}
                  <View /> {ingredient.Quantity} {ingredient.Unit}{" "}
                  {ingredient.Name}
                </Text>
              ))}
            </View>
            <View style={styles.recipeInfo}>
              <Text>Directions:</Text>
              {route.params.Instructions.map((instruction) => (
                <Text
                  key={route.params.Instructions.indexOf(instruction)}
                  style={{ flexDirection: "row", textTransform: "capitalize" }}
                >
                  <Text>
                    {/* Checkbox instead of view line 113*/}
                    <View /> Step{" "}
                    {route.params.Instructions.indexOf(instruction) + 1}:{" "}
                    {instruction}
                  </Text>
                </Text>
              ))}
            </View>
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
    backgroundColor: "rgba(230, 230, 230, 0.716)",
  },
  userinfo: {
    backgroundColor: "rgba(230, 230, 230, 0.716)",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
  },
  username: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    marginLeft: 30,
    width: 300,
    height: 200,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 23,
    marginRight: 52,
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
    // marginLeft: 70,
    marginBottom: 10,
    alignItems: "flex-end",
    marginRight: 30,
  },
  userImg: {
    height: 80,
    width: 80,
    borderRadius: 75,
  },
  back: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
});
