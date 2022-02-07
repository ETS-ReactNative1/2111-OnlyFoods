import React, { useState } from "react";
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
  MaterialIcons,
} from "@expo/vector-icons";

const SinglePostScreen = ({ navigation: { goBack }, route }) => {
   //console.log(route.params);
  /*Route params are listed here for easy reference to render*/
  // RecipeUsername: recipe.CreatorUsername,
  // RecipeName: recipe.Name,
  // TimeHrs: recipe.Time.Hours,
  // TimeMins: recipe.Time.Minutes,
  // Description: recipe.Description,
  // Ingredients: recipe.Ingredients,
  // Instructions: recipe.Instructions,
  // LoggedInUser: loggedInUser.Username,

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userinfo}>
            <Button onPress={() => goBack()} title="back" />
            <Image
              style={styles.userImg}
              source={require("../../Assets/Cook1.png")}
            />
            <View style={styles.username}>
              <Text> {route.params.RecipeUsername} </Text>
            </View>
            {route.params.LoggedInUser === route.params.RecipeUsername ? (
              <Feather name="edit-2" size={24} style={styles.edit} />
            ) : null}
          </View>

          <View style={styles.imageAndEdit}>
            <Image
              style={styles.image}
              source={{
                uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
              }}
            />
          </View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => alert("Added to Bookmark!")}>
              {/* <TouchableOpacity onPress={() => alert("Added to Bookmark!")}> */}
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={40}
                style={styles.bookmark}
              />
            </TouchableOpacity>

            <MaterialCommunityIcons name="food-fork-drink" size={40} />
          </View>
          <View style={styles.recipe}>
            <View style={styles.recipeInfo}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  alignItems: "center",
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
              <Text>Description: {route.params.Description}</Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text>Ingredients:</Text>
              {route.params.Ingredients.map((ingredient) => (
                <Text
                  key={route.params.Ingredients.indexOf(ingredient)}
                  style={{ flexDirection: "row" }}
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
                  style={{ flexDirection: "row" }}
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
    backgroundColor: "white",
  },
  userinfo: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 40,
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
    marginBottom: 70,
    flexDirection: "column",
    justifyContent: "flex-start",
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

  edit: {
    marginLeft: 70,
    marginTop: 10,
  },
  userImg: {
    height: 80,
    width: 80,
    borderRadius: 75,
  },
});
