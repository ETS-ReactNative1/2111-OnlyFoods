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
import { db } from "../../firebase_config";
import { collection, getDocs, query, where, orderBy, doc } from "firebase/firestore";

const HomeScreen = ({ navigation, loggedInUser }) => {
  //const user = auth.currentUser
  const recipesRef = collection(db, "recipes");
  const recipesQuery = query(
    recipesRef,
    where("Public", "==", true),
    orderBy("CreatedAt", "desc")
  );

  const [recipes, setRecipes] = useState([]);

  const refresh = () => {
    getDocs(recipesQuery)
      .then((snapshot) => {
        let snapRecipes = [];
        snapshot.docs.forEach((doc) => {
          snapRecipes.push(doc.data());
        });
        setRecipes(snapRecipes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <>
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* Code beloww is purely to check that data is being fetched properly */}
      <TouchableOpacity titleSize={20} style={styles.button} onPress={refresh}>
        <Text style={styles.buttonText}> Refresh Page </Text>
      </TouchableOpacity>
        <View>
        <Text>All public recipes in order of time of creation:</Text>
        {recipes.map((recipe, index) => (
          <Pressable key={index}
            onPress={() => navigation.navigate("SinglePost", {
            LoggedInUser: loggedInUser.Username,
            RecipeUsername: recipe.CreatorUsername,
            RecipeName: recipe.Name,
            TimeHrs: recipe.Time.Hours,
            TimeMins: recipe.Time.Minutes,
            Description: recipe.Description,
            Ingredients: recipe.Ingredients,
            Instructions: recipe.Instructions,
          })}
           >
          <Text>Username frm loggedin: {loggedInUser.Username}</Text>
          <Text>Username frm recipe: {recipe.CreatorUsername}</Text>
          <Text>Recipe Name: {recipe.Name} </Text>
          <Text>Recipe Creator UID: {recipe.Creator}</Text>
          <Text>Recipe Time in hrs: {recipe.Time.Hours}</Text>
          <Text>Recipe Time in mins: {recipe.Time.Minutes}</Text>
          <Text>Recipe Description: {recipe.Description}</Text>
          <Text>Ingredients: </Text>
          {recipe.Ingredients.map((ingredient)=> (
            <Text key={recipe.Ingredients.indexOf(ingredient)}>
              Name:{ingredient.Name}
              Qty: {ingredient.Quantity}
              Unit: {ingredient.Unit}
            </Text>
          ))}
          <Text>Instructions: </Text>
          {recipe.Instructions.map((instruction)=> (
            <Text key={recipe.Instructions.indexOf(instruction)}>
              Step {recipe.Instructions.indexOf(instruction) + 1}: {instruction}
            </Text>
          ))}
          <Text>x-----------------------------x</Text>
          </Pressable>
        ))}
  </View>
  </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0096F6",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
});
