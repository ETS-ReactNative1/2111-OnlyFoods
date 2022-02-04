import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useState, useEffect} from "react";
import { AntDesign } from "@expo/vector-icons";
import { firebase, auth, db } from "../firebase_config";
import { collection, getDocs, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore"
// import firestore from "@react-native-firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  // const {user, logout} = useContext(AuthContext)
  const user = auth.currentUser
  const recipesRef = collection(db, 'recipes')
  const recipesQuery = query(recipesRef, where('Creator', '==', user.uid))

  const [recipes, setRecipes] = useState([])
  //const [loading, setLoading] = useState(true)

  const refresh = () => {
    getDocs(recipesQuery)
      .then( (snapshot) => {
        let snapRecipes = []
        snapshot.docs.forEach( (doc) => {
          snapRecipes.push(doc.data())
        })
        setRecipes(snapRecipes)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    refresh()
    console.log('useEffect triggered')
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Image
              style={styles.userImg}
              source={require("../Assets/Cook1.png")}
            />
            <Text style={styles.userName}>Jane Doe</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>22</Text>
            <Text style={{ fontSize: 15 }}>Recipes</Text>
          </View>
          <View style={styles.icon}>
            <AntDesign name="setting" size={30} color="black" />
          </View>
        </View>


        {/* lines below are to check that firestore queries work */}
        <Pressable
            titleSize={20}
            style={styles.button}
            onPress={refresh}
          >
            <Text style={styles.buttonText}> Refresh Page </Text>
          </Pressable>

        <Text>{user.email}'s page</Text>
          <View>
            <Text>{user.email}'s Recipes:</Text>
            {
              recipes.map( (recipe, index) => <Text key={index}>{recipe['Name']}</Text>)
            }
          </View>

        <View style={styles.images}>
          <Image style={styles.img} source={require("../Assets/food1.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food2.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food3.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food4.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food5.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food6.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food7.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food8.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food9.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food10.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food11.jpeg")} />
          <Image style={styles.img} source={require("../Assets/food12.jpeg")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 30,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 75,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  userName: {
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
  },
  userInfoItem: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 70,
  },
  userHeader: {
    flexDirection: "row",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 50,
    alignItems: "center",
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  img: {
    height: 100,
    width: 100,
    marginBottom: 10,
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
