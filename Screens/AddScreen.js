// <View style={styles.container}>
//   <Text>Add Screen</Text>
//   <Button title="Add Post Screen" onPress={() => alert("Button Clicked")} />
// </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "black",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./AddScreenStyle";
import { firebase, auth, db } from "../firebase_config";
<<<<<<< HEAD
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { Picker } from '@react-native-picker/picker';
import {unsubProfile} from './ProfileScreenTest'
=======
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
>>>>>>> main

function AddScreen({ navigation }) {
  const user = auth.currentUser;
  const recipesRef = collection(db, "recipes");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [publicSetting, setPublicSetting] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handlePost = () => {
    // setName('')
    //     setDescription('')
    //     setCuisine('')
    //     setPublicSetting(false)
    //     setTime({ hours: 0, minutes: 0})
    //     setInstructions([])
    //     setIngredients([])
    //     navigation.navigate('Home')
    addDoc(recipesRef, {
      Name: name,
      Description: description,
      CreatedAt: serverTimestamp(),
      Creator: user.uid,
      // 'ImageURL': '',
      // 'Ingredients': ingredients,
      Public: publicSetting,
      // 'Instructions': instructions,
      // 'Time': time,
      // 'Cuisine': cuisine
    })
      .then(() => {
        setName('')
        setDescription('')
        setCuisine('')
        setPublicSetting(false)
        setTime({ hours: 0, minutes: 0})
        setInstructions([])
        setIngredients([])
        navigation.navigate('Home')
      })
      .catch(error => console.log(error))
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <TextInput
              placeholderTextColor="#444"
              placeholder="Name"
              autoCapitalize="none"
              onChangeText={text => setName(text)}
              value={name}
              textContentType="none"
              autoFocus={true}
            />

            <View />
          </View>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Description"
            onChangeText={text => setDescription(text)}
            value={description}
            autoCapitalize="none"
            textContentType="none"
          />
        </View>
        <Picker
          selectedValue={publicSetting}
          onValueChange={(itemValue) => setPublicSetting(itemValue)}
        >
          <Picker.Item label="Public" value={true} />
          <Picker.Item label="Private" value={false} />
        </Picker>
        <Pressable titleSize={20} style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}> Post! </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AddScreen;
