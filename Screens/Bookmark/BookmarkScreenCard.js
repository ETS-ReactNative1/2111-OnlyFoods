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
  Fontisto,
} from "@expo/vector-icons";
import CachedImage from "react-native-expo-cached-image";

const BookmarkScreenCard = ({
  navigation,
  recipe,
  updateBookmarks,
  loggedInUser,
  bookmarks,
  updateCooked,
}) => {
  const [heartColor, setHeartColor] = useState(false);
  const [cooked, setCooked] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(true);

  const heartPressed = () => {
    setHeartColor(!heartColor);
  };
  const foodPressed = () => {
    updateCooked(recipe);
    setCooked(!cooked);
  };

  const bookmarkPressed = (recipe) => {
    // setBookmarkColor(!bookmarkColor);
    updateBookmarks(recipe);
  };

  useEffect(() => {
    let cookedRecs = [];
    if (bookmarks.CookedRecipes) {
      cookedRecs = bookmarks.CookedRecipes.slice();
    }

    const cookedRecipe = cookedRecs.some((cookedR) => {
      return (
        cookedR.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
        cookedR.Creator === recipe.Creator
      );
    });

    if (cookedRecipe) setCooked(true);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5 }}>
      <View style={styles.imageContainer}>
        <View style={{ flex: 0.4 }}>
          <Pressable
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
                bookmarked: true,
                recipe,
                bookmarks,
                loggedInUser,
                setRecipeCardCooked: () => setCooked(!cooked),
                // setRecipeCardBookmark: () => setBookmarkColor(!bookmarkColor)
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
        </View>

        <View
          style={{
            flex: 0.7,
            justifyContent: "center",
          }}
        >
          <View style={styles.titleAndDescription}>
            <Pressable
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
                  bookmarked: true,
                  recipe,
                  bookmarks,
                  loggedInUser,
                  Time: recipe.Time,
                  //setRecipeCardBookmark: () => setBookmarked(!bookmarked)
                })
              }
            >
              <Text style={styles.title}>{recipe.Name}</Text>
            </Pressable>

            <Text style={styles.username}>{recipe.CreatorUsername}</Text>
            {/* <Text style={styles.duration}>RECIPE TIME</Text> */}
          </View>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.icons}>
            {/* <TouchableOpacity onPress={() => heartPressed()}>
          <Ionicons
            name="heart-outline"
            size={35}
            color={heartColor ? "red" : "black"}
          />
        </TouchableOpacity>*/}
            <View>
              <TouchableOpacity onPress={() => foodPressed()}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={35}
                  color={cooked ? "#2d6a45" : "black"}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => bookmarkPressed(recipe)}
              style={{ flex: 0.3 }}
            >
              <Fontisto
                name="bookmark-alt"
                size={35}
                color={bookmarkColor ? "#c9184a" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookmarkScreenCard;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  imageContainer: {
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 5,
    paddingLeft: 0,
    flexDirection: "row",
    borderColor: "#b07d62",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: "#fff1e6",
    marginHorizontal: 0,
    // borderTopWidth: 2,
    // borderRightWidth: 2,
    // borderLeftWidth: 2,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  img: {
    height: 110,
    width: 100,
    marginBottom: 0,
    marginLeft: 10,
    borderRadius: 3,
    marginVertical: 8,
    marginBottom: 8,
    // justifyContent: "flex-start",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 60,
    marginVertical: 20,
  },

  titleAndDescription: {
    justifyContent: "center",
    marginHorizontal: 0,
    paddingLeft: 25,
  },

  title: {
    paddingTop: 10,
    paddingLeft: 5,
    justifyContent: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginLeft: -20,
    fontSize: 18,
  },

  username: {
    marginTop: 5,
    flexDirection: "row",
    textTransform: "capitalize",
    fontSize: 14,
    marginLeft: -15,
  },
  icons: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    // paddingLeft: 20,
  },
});
