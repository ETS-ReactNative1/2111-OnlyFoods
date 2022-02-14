import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { updateDoc } from "firebase/firestore";
import BookmarkScreenCard from "./BookmarkScreenCard";
import { BookmarksContext } from "../../App";
import { BKRefContext } from "../../Navigation/Navigator";

const BookmarkScreen = ({ navigation, loggedInUser, refresh }) => {
  const [heartColor, setHeartColor] = useState(false);
  const [foodColor, setFoodColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(false);
  const [bookmarkScreenBookmarks, setBookmarkScreenBookmarks] = useState(null);

  const { bookmarks, setBookmarks } = useContext(BookmarksContext);
  const { BKRef, setBKRef } = useContext(BKRefContext);

  const heartPressed = () => {
    setHeartColor(!heartColor);
  };

  const bookmarkPressed = (recipe) => {
    const recipesArrCopy = bookmarks.BookmarkedRecipes.slice();

    const unBookmark = recipesArrCopy.filter((bookmark) => {
      return (
        bookmark.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
        bookmark.Creator !== recipe.Creator
      );
    });

    updateDoc(BKRef, { BookmarkedRecipes: unBookmark });
    setBookmarkScreenBookmarks({
      ...bookmarkScreenBookmarks,
      BookmarkedRecipes: unBookmark,
    });
    setBookmarks({ ...bookmarkScreenBookmarks, BookmarkedRecipes: unBookmark });
  };

  useEffect(() => {
    if (bookmarks) {
      setBookmarkScreenBookmarks(bookmarks);
    }
  }, [bookmarks]);

  const foodPressed = (recipe) => {
    let recipesArrCopy = [];

    if (bookmarks.CookedRecipes !== null) {
      recipesArrCopy = bookmarks.CookedRecipes.slice();
    }

    const hasRecipe = recipesArrCopy.some((bookmark) => {
      return (
        bookmark.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
        bookmark.Creator === recipe.Creator
      );
    });

    if (hasRecipe) {
      const unCooked = recipesArrCopy.filter((cooked) => {
        return (
          cooked.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
          cooked.Creator !== recipe.Creator
        );
      });

      updateDoc(BKRef, { CookedRecipes: unCooked });
      setBookmarks({ ...bookmarks, CookedRecipes: unCooked });
    } else {
      recipesArrCopy.push(recipe);
      updateDoc(BKRef, { CookedRecipes: recipesArrCopy });
      setBookmarks({ ...bookmarks, CookedRecipes: recipesArrCopy });
    }
  };

  // const bookmarkPressed = () => {
  //   setBookmarkColor(!bookmarkColor);
  // };

  // NOTES: COPY AND PASTE THE CODE BELOW WHEN MAPPING OVER TO USE THIS FRAME!!!!

  //   <View style={styles.imageContainer}>
  //   <Image
  //     style={styles.img}
  //     source={require("../../Assets/food1.jpeg")}
  //   />
  //   <View style={styles.titleAndDescription}>
  //     <Text style={styles.title}>Title of Recipie</Text>
  //     <Text style={styles.username}>rachel_isTired</Text>
  //     <Text style={styles.duration}>1hr 20min</Text>
  //   </View>

  //   <View style={styles.icons}>
  //     <TouchableOpacity onPress={() => heartPressed()}>
  //       <Ionicons
  //         name="heart-outline"
  //         size={35}
  //         color={heartColor ? "red" : "black"}
  //       />
  //     </TouchableOpacity>
  //     <TouchableOpacity onPress={() => foodPressed()}>
  //       <MaterialCommunityIcons
  //         name="food-fork-drink"
  //         size={35}
  //         color={foodColor ? "green" : "black"}
  //       />
  //     </TouchableOpacity>
  //     <TouchableOpacity onPress={() => bookmarkPressed()}>
  //       <Feather
  //         name="bookmark"
  //         size={35}
  //         color={bookmarkColor ? "red" : "black"}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // </View>
  // to commit

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 90 }}
      >
        <TouchableOpacity style={styles.refresh} onPress={refresh}>
          <MaterialIcons name="refresh" size={30} />
        </TouchableOpacity>
        {bookmarkScreenBookmarks ? (
          bookmarkScreenBookmarks.BookmarkedRecipes.map((recipe, index) => (
            <View key={index}>
              <BookmarkScreenCard
                navigation={navigation}
                recipe={recipe}
                index={index}
                loggedInUser={loggedInUser}
                updateBookmarks={bookmarkPressed}
                updateCooked={foodPressed}
                bookmarks={bookmarks}
                refresh={refresh}
              />
            </View>
          ))
        ) : (
          <Text>NoRecipesToRender</Text>
        )}
        {/* <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../../Assets/food1.jpeg")}
          />
          <View style={styles.titleAndDescription}>
            <Text style={styles.title}>Title of Recipie </Text>
            <Text style={styles.username}>rachel_Tired</Text>
            <Text style={styles.duration}>1hr 20min</Text>
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
            <TouchableOpacity onPress={() => bookmarkPressed()}>
              <Feather
                name="bookmark"
                size={35}
                color={bookmarkColor ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../../Assets/food2.jpeg")}
          />
          <View style={styles.titleAndDescription}>
            <Text style={styles.title}>Loves hotseats!</Text>
            <Text style={styles.username}>tenz_Hotseat</Text>
            <Text style={styles.duration}>2hr 5min</Text>
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
            <TouchableOpacity onPress={() => bookmarkPressed()}>
              <Feather
                name="bookmark"
                size={35}
                color={bookmarkColor ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../../Assets/food3.jpeg")}
          />
          <View style={styles.titleAndDescription}>
            <Text style={styles.title}>The Tab Queen</Text>
            <Text style={styles.username}>melissa's_Tabs</Text>
            <Text style={styles.duration}>2hr 30min</Text>
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
            <TouchableOpacity onPress={() => bookmarkPressed()}>
              <Feather
                name="bookmark"
                size={35}
                color={bookmarkColor ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require("../../Assets/food4.jpeg")}
          />
          <View style={styles.titleAndDescription}>
            <Text style={styles.title}>Seldon's</Text>
            <Text style={styles.username}>Tinder_Swinder</Text>
            <Text style={styles.duration}>1hr 20min</Text>
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
            <TouchableOpacity onPress={() => bookmarkPressed()}>
              <Feather
                name="bookmark"
                size={35}
                color={bookmarkColor ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(240, 216, 206)",
    flex: 1,
    justifyContent: "center",
  },
  refresh: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 25,
    marginTop: 10,
  },
  // imageContainer: {
  //   marginTop: 20,
  //   flexDirection: "row",
  //   borderRadius: 5,
  //   borderColor: "black",
  //   borderBottomWidth: 2,
  //   borderTopWidth: 2,
  //   borderRightWidth: 2,
  //   borderLeftWidth: 2,
  // },
  // img: {
  //   height: 100,
  //   // width: 100,
  //   marginBottom: 10,
  //   marginTop: 10,
  //   marginLeft: 20,
  //   justifyContent: "flex-start",
  // },
  // titleAndDescription: {
  //   justifyContent: "center",
  //   marginHorizontal: 30,
  // },
  // title: {
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   textDecorationLine: "underline",
  //   fontWeight: "bold",
  // },
  // username: {
  //   marginTop: 5,
  //   flexDirection: "column",
  // },
  // duration: {
  //   marginTop: 5,
  // },
  // icons: {
  //   justifyContent: "space-between",
  //   alignContent: "center",
  //   marginHorizontal: 40,
  // },
});
