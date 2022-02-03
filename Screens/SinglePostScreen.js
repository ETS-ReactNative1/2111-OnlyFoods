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
import React from "react";
import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

const SinglePostScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.userinfo}>
            <Octicons name="octoface" size={35} color="white" />
            <View style={styles.username}>
              <Text style={{ color: "white" }}> rachel_username</Text>
            </View>
          </View>

          <View style={styles.fire}>
            <MaterialIcons name="local-fire-department" size={50} color="red" />
          </View>
          <View style={styles.imageAndEdit}>
            <Image
              style={styles.image}
              source={{
                uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
              }}
            />

            <Feather name="edit-2" size={24} color="white" />
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

            <MaterialCommunityIcons
              name="food-fork-drink"
              size={40}
              color="white"
            />
          </View>
          <View style={styles.recipe}>
            <View style={styles.recipeInfo}>
              <Text
                style={{
                  color: "white",
                  textDecorationLine: "underline",
                  alignItems: "center",
                }}
              >
                Title of Recipie
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={{ color: "white" }}>
                Description: Like your date? Want to see her again? This recipe
                is all you need to score the next date with your boo
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={{ color: "white" }}>
                Ingredients: Your time, your love, your dedication, yo money{" "}
              </Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={{ color: "white" }}>Time: 1hr 20min</Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={{ color: "white" }}>
                Recipe Steps: Sopa de fideo is a quick and comforting Mexican
                staple that is particularly good on a chilly weeknight. The
                acidity from tomatoes, the bold garlic flavor and the luscious
                strands of fideo, a thin noodle similar to angel hair that’s
                typically included in Mexican soups, make for a hearty dish.
                Toppings for sopa de fideo vary, but common garnishes include
                avocado slices, sautéed mushrooms, lime juice, queso fresco,
                cooked potatoes, Mexican cream — the list goes on!. Sopa de
                fideo is a quick and comforting Mexican staple that is
                particularly good on a chilly weeknight. The acidity from
                tomatoes, the bold garlic flavor and the luscious strands of
                fideo, a thin noodle similar to angel hair that’s typically
                included in Mexican soups, make for a hearty dish. Toppings for
                sopa de fideo vary, but common garnishes include avocado slices,
                sautéed mushrooms, lime juice, queso fresco, cooked potatoes,
                Mexican cream — the list goes on!.
              </Text>
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
    backgroundColor: "black",
    textDecorationColor: "white",
  },
  userinfo: {
    backgroundColor: "black",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 40,
  },
  username: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginHorizontal: 30,
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
  bookmark: {
    color: "white",
  },
});
