import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const BookmarkScreen = ({ navigation }) => {
  const [heartColor, setHeartColor] = useState(false);
  const [foodColor, setFoodColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(false);

  const heartPressed = () => {
    setHeartColor(!heartColor);
  };
  const foodPressed = () => {
    setFoodColor(!foodColor);
  };
  const bookmarkPressed = () => {
    setBookmarkColor(!bookmarkColor);
  };

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
      <ScrollView>
        <View style={styles.imageContainer}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default BookmarkScreen;

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
