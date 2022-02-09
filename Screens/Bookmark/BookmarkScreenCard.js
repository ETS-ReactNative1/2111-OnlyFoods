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

const BookmarkScreenCard = ({
  navigation,
  recipe,
  updateBookmarks,
  loggedInUser,
  bookmarks,
}) => {
  const [heartColor, setHeartColor] = useState(false);
  const [foodColor, setFoodColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(true);

  const heartPressed = () => {
    setHeartColor(!heartColor);
  };
  const foodPressed = () => {
    setFoodColor(!foodColor);
  };

  const bookmarkPressed = (recipe) => {
    // setBookmarkColor(!bookmarkColor);
    updateBookmarks(recipe);
  };

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
                //setRecipeCardBookmark: () => setBookmarked(!bookmarked)
              })
            }
          >
            <Image
              style={styles.img}
              source={require("../../Assets/food1.jpeg")}
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => foodPressed()}>
          <MaterialCommunityIcons
            name="food-fork-drink"
            size={35}
            color={foodColor ? "green" : "black"}
          />
        </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => bookmarkPressed(recipe)}
              style={{ flex: 0.3 }}
            >
              <Fontisto
                name="bookmark-alt"
                size={35}
                color={bookmarkColor ? "red" : "black"}
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
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "rgba(230, 230, 230, 0.716)",
    marginHorizontal: 10,
    // borderTopWidth: 2,
    // borderRightWidth: 2,
    // borderLeftWidth: 2,
  },
  img: {
    height: 100,
    width: 100,
    marginBottom: 10,
    marginLeft: 5,
    borderRadius: 5,
    // justifyContent: "flex-start",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 60,
  },

  titleAndDescription: {
    justifyContent: "center",
    marginHorizontal: 5,
    paddingLeft: 10,
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
    fontSize: 18,
    marginLeft: -15,
  },
  icons: {
    justifyContent: "center",
    marginHorizontal: 10,
    // paddingLeft: 20,
  },
});
