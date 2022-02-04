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
  SafeAreaView,
  FlatList
} from "react-native";
import styles from "./HomeScreenTestStyles"
import { firebase, auth, db } from "../firebase_config";
import { collection, getDocs, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore"

const HomeScreenTest = ({ navigation }) => {
  const user = auth.currentUser
  const recipesRef = collection(db, 'recipes')
  //const recipesQuery = query(recipesRef, where('Creator', '==', user.uid))

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  // onSnapshot(recipesRef, (snapshot) => {
  //   let snapRecipes = []
  //     snapshot.docs.forEach( (doc) => {
  //       snapRecipes.push(doc.data())
  //     })
  //     setRecipes(snapRecipes)
  // })

  return (
    <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <SafeAreaView>
          <Text>Home page</Text>
          <View>
            <Text>Everyone's Recipes:</Text>
            <FlatList
              data={recipes}
              renderItem={({item}) => <Text>{item['Name']}</Text>}
              keyExtractor={(item, index) => index}
            />
          </View>
        </SafeAreaView>

      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreenTest
