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
} from "@expo/vector-icons";

const BookmarkScreenCard = ({navigation, recipe, updateBookmarks, loggedInUser, bookmarks}) => {

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
    setBookmarkColor(!bookmarkColor);
    updateBookmarks(recipe)
  };

  return (
    <View style={styles.imageContainer}>

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

      <View style={styles.titleAndDescription}>
        <Text style={styles.title}>{recipe.Name}</Text>
        <Text style={styles.username}>{recipe.CreatorUsername}</Text>
        <Text style={styles.duration}>RECIPE TIME</Text>
      </View>



      <View style={styles.icons}>
        <TouchableOpacity onPress={() => heartPressed()}>
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => bookmarkPressed(recipe)}>
          <Feather
            name="bookmark"
            size={35}
            color={bookmarkColor ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookmarkScreenCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  imageContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "black",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  img: {
    height: 100,
    width: 100,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: "flex-start",
  },

  titleAndDescription: {
    justifyContent: "center",
    marginHorizontal: 30,
  },
  title: {
    flexDirection: "column",
    justifyContent: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  username: {
    marginTop: 5,
    flexDirection: "column",
  },
  duration: {
    marginTop: 5,
  },
  icons: {
    justifyContent: "space-between",
    marginHorizontal: 40,
  },
});
