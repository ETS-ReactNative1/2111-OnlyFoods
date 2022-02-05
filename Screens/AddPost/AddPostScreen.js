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
  FlatList,
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
      label: 'lb',
      value: 'lb',
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
  const [publicSetting, setPublicSetting] = useState(false);
  const [time, setTime] = useState({ "Hours": '0', "Minutes": '0' });
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editTime, setEditTime] = useState(false)
  const [editIngredients, setEditIngredients] = useState(false)
  const [editInstructions, setEditInstructions] = useState(false)

  const addIngredient = () => {
    setIngredients([...ingredients, { 'Name': '', 'Unit': '', 'Quantity': ''}])
  }

  const deleteIngredient = (index) => {
    const updatedIngredients = ingredients.slice()
    updatedIngredients.splice(index, 1)
    setIngredients([...updatedIngredients])
  }

  const addInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const deleteInstruction = (index) => {
    const updatedInstructions = instructions.slice()
    updatedInstructions.splice(index, 1)
    setInstructions([...updatedInstructions])
  }

  const handlePost = () => {
    const filteredIngredients = ingredients.slice().filter((item) => item.Name !== '')
    const filteredInstructions = instructions.slice().filter((item) => item !== '')

    const newRecipe = {
      Name: name,
      Description: description,
      CreatedAt: serverTimestamp(),
      Creator: loggedInUser.UserId,
      CreatorUsername: loggedInUser.Username,
      // 'ImageURL': '',
      Ingredients: filteredIngredients,
      Public: publicSetting,
      Instructions: filteredInstructions,
      Time: time
    }

    if(name === '' || description ==='' || !ingredients.length || !ingredients.length ) {
      Alert.alert(
        "Missing fields",
        "Please fill all mandatory fields",
        [
          { text: "Back" }
        ]
      );
    } else {
      addDoc(recipesRef, newRecipe)
      .then(() => {
        setName("");
        setDescription("");
        setPublicSetting(false);
        setTime({ Hours: "0", Minutes: "0" });
        setInstructions([]);
        setIngredients([]);
        setEditTime(false);
        setEditInstructions(false);
        setEditIngredients(false);
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error));
    }

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
              placeholder="Recipe Name (Required)"
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
            placeholder="Recipe Description (Required)"
            onChangeText={(text) => setDescription(text)}
            value={description}
            autoCapitalize="none"
            textContentType="none"
          />
        </View>

        {/* Cook Time Input */}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex:.8}}>
          <Text>Cook Time (Optional)</Text>
          </View>
          <View style={{flex:.3}}>
            { !editTime ?
              (
                <Pressable>
                  <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={() => setEditTime(true)}> Edit Time</Text>
                </Pressable>
              ) : (

                <Pressable>
                  <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={() => {
                    if(time.Hours === '') setTime({Hours: '0', Minutes: time.Minutes})
                    if(time.Minutes === '') setTime({Hours: time.Hours, Minutes: '0'})
                    setEditTime(false)
                  }}> Done Editing</Text>
                </Pressable>

              )
              }
          </View>
        </View>

        { editTime ?
          (<View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex:.25}}>
                <View style={styles.input}>
                  <TextInput
                    placeholderTextColor="#444"
                    placeholder="Hours"
                    onChangeText={(text) => {
                      setTime({'Hours': text, 'Minutes': time.Minutes})
                    }}
                    value={`${time.Hours}`}
                    autoCapitalize="none"
                    textContentType="none"
                  />
                </View>
              </View>

              <View style={{flex:.25, alignItems: "center", justifyContent: "center"}}>
                <Text>Hours</Text>
              </View>

              <View style={{flex:.25}}>
                <View style={styles.input}>
                  <TextInput
                    placeholderTextColor="#444"
                    placeholder="Minutes"
                    onChangeText={(text) => {
                      setTime({'Hours': time.Hours, 'Minutes': text})
                    }}
                    value={`${time.Minutes}`}
                    autoCapitalize="none"
                    textContentType="none"
                  />
                </View>
              </View>

              <View style={{flex:.25, alignItems: "center", justifyContent: "center"}}>
                <Text>Minutes</Text>
              </View>
            </View>
          </View>) : (
            (time.Hours !== '0' || time.Minutes !== '0') ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:.5, paddingLeft:10}}>
                  <Text>{time.Hours} {'hour(s)'} and {time.Minutes} {'minute(s)'}</Text>
                </View>
                <View style={{flex:.25}}></View>
              </View>) : <></>
          )
        }

        {/* Ingredients Inputs */}
        <View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex:.8}}>
          <Text>Ingredients (Required)</Text>
          </View>
          <View style={{flex:.3}}>
            { !editIngredients ?
              (
                <Pressable>
                  <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={() => setEditIngredients(true)}> Edit Ingredients</Text>
                </Pressable>
              ) : (

                <Pressable>
                  <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={() => {
                    const filteredIngredients = ingredients.slice().filter((item) => item.Name !== '')
                    setIngredients(filteredIngredients)
                    setEditIngredients(false)
                  }}> Done Editing</Text>
                </Pressable>

              )
              }
          </View>
        </View>

          {
            editIngredients ?
              (
                <View>
                  {ingredients.map( (ingredient, index) => {
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
                        <View style={{flex:.2}}>
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
                                setIngredients(ingredientsCopy)
                              }}
                              style={{ inputAndroid: { color: 'black' } }}
                              value={ingredients[index].Unit}
                          />
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:.3}}>
                          <Pressable>
                            <Text style={{ fontWeight: "bold", color: "red", paddingBottom:10 }} onPress={() => deleteIngredient(index)}> Delete Ingredient</Text>
                          </Pressable>
                        </View>
                        <View style={{flex:.6}}>
                        </View>
                      </View>
                    </View>
                  )
                })}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, paddingRight: 10, paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Pressable>
                    <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={addIngredient}> Add Ingredient </Text>
                  </Pressable>
                </View>
              </View>
            </View>
              ) : (

                  ingredients.map((ingredient, index) => {
                    return (
                      <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                        <View style={{flex:.2, paddingLeft: 20}}>
                          <Text>{ingredient.Quantity} {ingredient.Unit}</Text>
                        </View>
                        <View style={{flex:.9}}>
                          <Text>{ingredient.Name}</Text>
                        </View>
                      </View>
                    )
                  })

              )
          }
        </View>

        {/* Instructions Input */}

        <View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex:.8}}>
            <Text>Instructions (Required)</Text>
          </View>
          <View style={{flex:.3}}>
            { !editInstructions ?
              (
                <Pressable>
                  <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={() => setEditInstructions(true)}> Edit Instructions</Text>
                </Pressable>
              ) : (
                <View style={{flex:.3}}>
                  <Pressable>
                    <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={() => {
                    let instructionsCopy = instructions.slice().filter((item) => item !== '')
                    setInstructions(instructionsCopy)
                    setEditInstructions(false)
                  }}> Done Editing </Text>
                  </Pressable>
                </View>
              )
              }
          </View>
        </View>

          {
            editInstructions ?
              (
                <View>
                  {instructions.map( (instruction, index) => {
                  return (
                    <View key={index}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:.1}}>
                          <Text style={{justifyContent: "center"}}>{index+1}.</Text>
                        </View>
                        <View style={{flex:.9}}>
                          <View style={styles.input}>
                            <TextInput
                              placeholderTextColor="#444"
                              placeholder="Instruction"
                              onChangeText={(text) => {
                                let instructionsCopy = instructions.slice()
                                instructionsCopy[index] = text
                                setInstructions(instructionsCopy)
                              }}
                              value={instructions[index]}
                              autoCapitalize="none"
                              textContentType="none"
                            />
                          </View>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:.3}}>
                          <Pressable>
                            <Text style={{ fontWeight: "bold", color: "red", paddingBottom:10 }} onPress={() => deleteInstruction(index)}> Delete Instruction</Text>
                          </Pressable>
                        </View>
                        <View style={{flex:.6}}>
                        </View>
                      </View>
                    </View>
                  )
                })}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, paddingRight: 10, paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Pressable>
                    <Text style={{ fontWeight: "bold", color: "dodgerblue", paddingBottom:10 }} onPress={addInstruction}> Add Instruction </Text>
                  </Pressable>
                </View>
              </View>
            </View>
              ) : (

                  instructions.map((instruction, index) => {
                    return (
                      <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                        <View style={{flex:.1}}>
                          <Text style={{justifyContent: "center"}}>{index+1}.</Text>
                        </View>
                        <View style={{flex:.9, paddingLeft: 10}}>
                          <Text>{instruction}</Text>
                        </View>
                      </View>
                    )
                  })

              )
          }
        </View>


        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex:.7}}>
            <Text>Post Privacy Setting</Text>
          </View>
          <View style={{flex:.35}}>
              <RNPickerSelect
                placeholder={{}}
                items={publicOrNot}
                onValueChange={value => {
                  setPublicSetting(value);
                }}
                style={styles}
                value={publicSetting}
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
