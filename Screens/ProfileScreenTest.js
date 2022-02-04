import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import styles from "./ProfileScreenStyle"
import { firebase, auth, db } from "../firebase_config";
import { collection, getDocs, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore"

let unsubProfile

const ProfileScreenTest = ({ navigation }) => {
  const user = auth.currentUser
  const recipesRef = collection(db, 'recipes')
  const recipesQuery = query(recipesRef, where('Creator', '==', user.uid))

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  let refresh = () => {
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

  useEffect(() => refresh(), [])

  return (
    <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Pressable
          titleSize={20}
          style={styles.button}
          onPress={refresh}
        >
          <Text style={styles.buttonText}> Refresh Page </Text>
        </Pressable>
        <SafeAreaView>
          <Text>{user.email}'s page</Text>
          <View>
            <Text>{user.email}'s Recipes:</Text>
            {
              recipes.map( (recipe, index) => <Text key={index}>{recipe['Name']}</Text>)
            }
          </View>
        </SafeAreaView>

      </View>
    </KeyboardAvoidingView>
  );
};

export { unsubProfile}

export default ProfileScreenTest
