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
      </ScrollView>
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(230, 230, 230, 0.716)",
    flex: 1,
    justifyContent: "center",
  },
  refresh: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 25,
    marginTop: 10,
  },
});
