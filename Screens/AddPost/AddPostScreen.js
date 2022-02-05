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
  ScrollView,
  Alert
} from "react-native";
import styles from "./AddScreenStyle";
import { firebase, auth, db } from "../../firebase_config";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Picker } from "react-native";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { set } from "core-js/core/dict";
//import { useHeaderHeight } from 'react-navigation-stack';

function AddPostScreen({ navigation, loggedInUser }) {
  //const user = auth.currentUser;
  const recipesRef = collection(db, "recipes");

  const publicOrNot = [
    {
      label: 'Public',
      value: true,
    },
    {
      label: 'Private',
      value: false,
    }
  ];

  const measurementUnits = [
    {
      label: 'g',
      value: 'g',
    },
    {
      label: 'mL',
      value: 'mL',
    },
    {
      label: 'L',
      value: 'L',
    },
    {
      label: 'oz',
      value: 'oz',
    },
    {
      label: 'Tsp',
      value: 'Tsp',
    },
    {
      label: 'Tbsp',
      value: 'Tbsp',
    },
    {
      label: 'Cup',
      value: 'Cup',
    },
    {
      label: 'Pint',
      value: 'Pint',
    },
    {
      label: 'Quart',
      value: 'Quart',
    },
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [publicSetting, setPublicSetting] = useState(false);
  const [time, setTime] = useState({ "Hours": 0, "Minutes": 0 });
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    setIngredients([...ingredients, { 'Name': '', 'Unit': '', 'Quantity': ''}])
  }

  const deleteIngredient = (index) => {
    const updatedIngredients = ingredients.slice()
    updatedIngredients.splice(index, 1)
    setIngredients([...updatedIngredients])
  }

  const handlePost = () => {
      addDoc(recipesRef, {
        Name: name,
        Description: description,
        CreatedAt: serverTimestamp(),
        Creator: loggedInUser.UserId,
        CreatorUsername: loggedInUser.Username,
        // 'ImageURL': '',
        // 'Ingredients': ingredients,
        Public: publicSetting,
        // 'Instructions': instructions,
        // 'Time': time,
        // 'Cuisine': cuisine
      })
        .then(() => {
          setName("");
          setDescription("");
          setCuisine("");
          setPublicSetting(false);
          setTime({ hours: 0, minutes: 0 });
          setInstructions([]);
          setIngredients([]);
          navigation.navigate("Home");
        })
        .catch((error) => console.log(error));
  };

  const ingredientForm = () => {
    return (
      <TextInput
            placeholderTextColor="#444"
            placeholder="Ingredient Name"
            onChangeText={(text) => setDescription(text)}
            value={description}
            autoCapitalize="none"
            textContentType="none"
          />
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="always"
      //keyboardVerticalOffset = {useHeaderHeight() + 20}
    >
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.input}>
            <TextInput
              placeholderTextColor="#444"
              placeholder="Name"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
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
            onChangeText={(text) => setDescription(text)}
            value={description}
            autoCapitalize="none"
            textContentType="none"
          />
        </View>




        <View>
          <Text>Ingredients</Text>
          {
            ingredients.map( (ingredient, index) => {
              return (
                <View key={index}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:.5}}>
                      <View style={styles.input}>
                        <TextInput
                          placeholderTextColor="#444"
                          placeholder="Ingredient Name"
                          onChangeText={(text) => {
                            let ingredientsCopy = ingredients.slice()
                            ingredientsCopy[index].Name = text
                            setIngredients(ingredientsCopy)
                          }}
                          value={ingredients[index].Name}
                          autoCapitalize="none"
                          textContentType="none"
                        />
                      </View>
                    </View>
                    <View style={{flex:.25}}>
                      <View style={styles.input}>
                        <TextInput
                          placeholderTextColor="#444"
                          placeholder="Amount"
                          onChangeText={(text) => {
                            let ingredientsCopy = ingredients.slice()
                            ingredientsCopy[index].Quantity = text
                            setIngredients(ingredientsCopy)
                          }}
                          value={ingredients[index].Quantity}
                          autoCapitalize="none"
                          textContentType="none"
                        />
                      </View>
                    </View>
                    <View style={{flex:.3}}>
                      <RNPickerSelect
                          placeholder={{
                            label: 'Unit',
                            value: null
                          }}
                          items={measurementUnits}
                          onValueChange={value => {
                            let ingredientsCopy = ingredients.slice()
                            ingredientsCopy[index].Unit = value
                          }}
                          style={styles}
                      />
                    </View>
                  </View>
                  <Pressable>
                    <Text style={{ fontWeight: "bold", color: "dodgerblue" }} onPress={() => deleteIngredient(index)}> Delete Ingredient</Text>
                  </Pressable>
                </View>
              )
            })
          }
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex:.8}}>
            <></>
          </View>
          <View style={{flex:.2}}>
            <Pressable titleSize={20} style={styles.button} onPress={addIngredient}>
              <Text style={{ fontWeight: "600", color: "#fff", fontSize: 10}}> Add Ingredient </Text>
            </Pressable>
          </View>
        </View>

        <Pressable titleSize={20} style={styles.button} onPress={() => console.log(ingredients)}>
          <Text style={styles.buttonText}> View Ingredients </Text>
        </Pressable>
        {/* <Picker
          selectedValue={publicSetting}
          onValueChange={(itemValue) => setPublicSetting(itemValue)}
        >
          <Picker.Item label="Public" value={true} />
          <Picker.Item label="Private" value={false} />
        </Picker> */}


        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex:.5}}>
            <Text>Post Privacy Setting</Text>
          </View>
          <View style={{flex:.5}}>
              <RNPickerSelect
                placeholder={{}}
                items={publicOrNot}
                onValueChange={value => {
                  setPublicSetting(value);
                }}
                style={styles}
              />
          </View>
        </View>

        <Pressable titleSize={20} style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}> Post! </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddPostScreen;
