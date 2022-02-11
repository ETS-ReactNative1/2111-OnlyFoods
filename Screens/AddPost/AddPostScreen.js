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
  Alert,
  TouchableOpacity,
} from "react-native";
import styles from "./AddScreenStyle";
import { firebase, auth, db } from "../../firebase_config";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Picker } from "react-native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import PhotoUpload, { imageUrl } from "../ImagePicker/ImagePicker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set } from "core-js/core/dict";
//import { useHeaderHeight } from 'react-navigation-stack';
import { MaterialIcons, Entypo } from "react-native-vector-icons";
import CachedImage from "react-native-expo-cached-image";

function AddPostScreen({ navigation, loggedInUser }) {
  //const user = auth.currentUser;
  const recipesRef = collection(db, "recipes");

  const publicOrNot = [
    {
      label: "Public",
      value: true,
    },
    {
      label: "Private",
      value: false,
    },
  ];

  const measurementUnits = [
    {
      label: "g",
      value: "g",
    },
    {
      label: "mL",
      value: "mL",
    },
    {
      label: "L",
      value: "L",
    },
    {
      label: "oz",
      value: "oz",
    },
    {
      label: "lb",
      value: "lb",
    },
    {
      label: "Tsp",
      value: "Tsp",
    },
    {
      label: "Tbsp",
      value: "Tbsp",
    },
    {
      label: "Cup",
      value: "Cup",
    },
    {
      label: "Pint",
      value: "Pint",
    },
    {
      label: "Quart",
      value: "Quart",
    },
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [publicSetting, setPublicSetting] = useState(false);
  const [time, setTime] = useState({ Hours: "0", Minutes: "0" });
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editTime, setEditTime] = useState(false);
  const [editIngredients, setEditIngredients] = useState(false);
  const [editInstructions, setEditInstructions] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const setImageUrlCallback = (url) => {
    setImageUrl(url);
    setAddPhoto(false);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { Name: "", Unit: "", Quantity: "" }]);
  };

  const deleteIngredient = (index) => {
    const updatedIngredients = ingredients.slice();
    updatedIngredients.splice(index, 1);
    setIngredients([...updatedIngredients]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const deleteInstruction = (index) => {
    const updatedInstructions = instructions.slice();
    updatedInstructions.splice(index, 1);
    setInstructions([...updatedInstructions]);
  };

  const handlePost = async () => {
    const filteredIngredients = ingredients
      .slice()
      .filter((item) => item.Name !== "");
    const filteredInstructions = instructions
      .slice()
      .filter((item) => item !== "");

    const newRecipe = {
      Name: name,
      Description: description,
      CreatedAt: serverTimestamp(),
      Creator: loggedInUser.UserId,
      CreatorUsername: loggedInUser.Username,
      ImageURL: imageUrl,
      Ingredients: filteredIngredients,
      Public: publicSetting,
      Instructions: filteredInstructions,
      Time: time,
    };

    if (
      name === "" ||
      description === "" ||
      !ingredients.length ||
      !instructions.length ||
      !imageUrl
    ) {
      let missingInfo = "";
      if (!name) missingInfo += "Recipe name";
      if (!description) {
        if (missingInfo.length > 0) missingInfo += ", description";
        else missingInfo += "Description";
      }
      if (!ingredients.length) {
        if (missingInfo.length > 0) missingInfo += ", ingredients";
        else missingInfo += "Ingredients";
      }
      if (!instructions.length) {
        if (missingInfo.length > 0) missingInfo += ", instructions";
        else missingInfo += "Instructions";
      }
      if (!imageUrl) {
        if (missingInfo.length > 0) missingInfo += ", picture";
        else missingInfo += "Picture";
      }
      Alert.alert(
        "Missing fields",
        `Please fill all mandatory fields: \n \n${missingInfo}`,
        [{ text: "Back" }]
      );
    } else {
      const newdoc = await addDoc(recipesRef, newRecipe)
        .then((newdoc) => {
          setName("");
          setDescription("");
          setPublicSetting(false);
          setTime({ Hours: "0", Minutes: "0" });
          setInstructions([]);
          setIngredients([]);
          setEditTime(false);
          setEditInstructions(false);
          setEditIngredients(false);
          setImageUrl("");
          navigation.navigate("Home");
          // CreatedAt: newRecipe.CreatedAt,
          // Creator: loggedInUser.UserId,
          // LoggedInUser: loggedInUser.Username,
          // Description: description,
          // ImageURL: imageUrlCheck,
          // Ingredients: filteredIngredients,
          // Instructions: filteredInstructions,
          // RecipeUsername: loggedInUser.Username,
          // RecipeName: name,
          // Public: publicSetting,
          // Time: time,
          // loggedInUser: loggedInUser,
          // bookmarked: false,
          // docId: newdoc.id });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%", height: "80%" }}
        // keyboardShouldPersistTaps="always"
        // keyboardVerticalOffset={useHeaderHeight() + 20}
      >
        <View>
          {!addPhoto ? (
            <View>
              <View style={styles.imageContainer}>
                {/* <TouchableOpacity
                  onPress={() => setAddPhoto(true)}
                  style={{ paddingTop: 30, paddingBottom: 20 }}
                >
                  <MaterialIcons name="camera-alt" size={50} />
                </TouchableOpacity> */}
                {imageUrl !== "" ? (
                  <TouchableOpacity
                    onPress={() => setAddPhoto(true)}
                    style={{ paddingTop: 30, paddingBottom: 20 }}
                  >
                    <CachedImage
                      source={{ uri: imageUrl }}
                      style={styles.imageBox}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setAddPhoto(true)}
                    style={{ paddingTop: 30, paddingBottom: 20 }}
                  >
                    <MaterialIcons name="camera-alt" size={50} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <PhotoUpload
              setImageUrlCallback={setImageUrlCallback}
              url={imageUrl}
            />
          )}
        </View>

        <View style={styles.wrapper}>
          <Text>Recipe Name</Text>
          <View style={styles.input}>
            <TextInput
              placeholderTextColor="#444"
              placeholder="Required"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
              value={name}
              textContentType="none"
              autoFocus={true}
            />

            <View />
          </View>
        </View>
        <Text style={{ paddingTop: 5 }}>Recipe Description</Text>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Required"
            onChangeText={(text) => setDescription(text)}
            value={description}
            autoCapitalize="none"
            textContentType="none"
          />
        </View>

        {/* Cook Time Input */}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.8 }}>
            <Text>Cook Time (Optional)</Text>
          </View>
          <View style={{ flex: 0.3, marginRight: -100 }}>
            {!editTime ? (
              <Pressable
                onPress={() => setEditTime(true)}
                style={{ paddingTop: 10 }}
              >
                <MaterialIcons name="edit" size={25} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  if (time.Hours === "") {
                    setTime({ Hours: "0", Minutes: time.Minutes });
                  }
                  if (time.Minutes === "") {
                    setTime({ Hours: time.Hours, Minutes: "0" });
                  }
                  setEditTime(false);
                }}
                style={{ paddingTop: 10 }}
              >
                <Entypo name="check" size={30} />
              </Pressable>
            )}
          </View>
        </View>

        {editTime ? (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 0.15 }}>
                <View style={styles.input}>
                  <TextInput
                    placeholderTextColor="#444"
                    placeholder="Hours"
                    onChangeText={(text) => {
                      setTime({ Hours: text, Minutes: time.Minutes });
                    }}
                    value={`${time.Hours}`}
                    autoCapitalize="none"
                    textContentType="none"
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 0.25,
                  alignItems: "left",
                  paddingLeft: 5,
                  justifyContent: "center",
                }}
              >
                <Text>Hours</Text>
              </View>

              <View style={{ flex: 0.15, marginLeft: -50 }}>
                <View style={styles.input}>
                  <TextInput
                    placeholderTextColor="#444"
                    placeholder="Minutes"
                    onChangeText={(text) => {
                      setTime({ Hours: time.Hours, Minutes: text });
                    }}
                    value={`${time.Minutes}`}
                    autoCapitalize="none"
                    textContentType="none"
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 0.25,
                  alignItems: "left",
                  paddingLeft: 5,
                  justifyContent: "center",
                }}
              >
                <Text>Minutes</Text>
              </View>
            </View>
          </View>
        ) : time.Hours !== "0" || time.Minutes !== "0" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.5, paddingLeft: 10 }}>
              <Text>
                {time.Hours} {"hour(s)"} and {time.Minutes} {"minute(s)"}
              </Text>
            </View>
            <View style={{ flex: 0.25 }}></View>
          </View>
        ) : (
          <></>
        )}

        {/* Ingredients Inputs */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.8 }}>
              <Text>Ingredients (Required)</Text>
            </View>
            <View style={{ flex: 0.3, marginRight: -100 }}>
              {!editIngredients ? (
                <Pressable
                  onPress={() => setEditIngredients(true)}
                  style={{ paddingTop: 10 }}
                >
                  <MaterialIcons name="edit" size={25} />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    const filteredIngredients = ingredients
                      .slice()
                      .filter((item) => item.Name !== "");
                    setIngredients(filteredIngredients);
                    setEditIngredients(false);
                  }}
                  style={{ paddingTop: 10 }}
                >
                  <Entypo name="check" size={25} />
                </Pressable>
              )}
            </View>
          </View>

          {editIngredients ? (
            <View>
              {ingredients.map((ingredient, index) => {
                return (
                  <View key={index}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ flex: 5, paddingTop: 10 }}>
                        <View style={styles.input}>
                          <TextInput
                            placeholderTextColor="#444"
                            placeholder="Ingredient"
                            onChangeText={(text) => {
                              let ingredientsCopy = ingredients.slice();
                              ingredientsCopy[index].Name = text;
                              setIngredients(ingredientsCopy);
                            }}
                            value={ingredients[index].Name}
                            autoCapitalize="none"
                            textContentType="none"
                          />
                        </View>
                      </View>
                      <View
                        style={{ flex: 1.8, paddingLeft: 10, paddingTop: 10 }}
                      >
                        <View style={styles.input}>
                          <TextInput
                            placeholderTextColor="#444"
                            placeholder="Amount"
                            onChangeText={(text) => {
                              let ingredientsCopy = ingredients.slice();
                              ingredientsCopy[index].Quantity = text;
                              setIngredients(ingredientsCopy);
                            }}
                            value={ingredients[index].Quantity}
                            autoCapitalize="none"
                            textContentType="none"
                          />
                        </View>
                      </View>
                      <View
                        style={{ flex: 0, paddingLeft: 5, paddingRight: 5 }}
                      >
                        <RNPickerSelect
                          placeholder={{
                            label: "Unit",
                            value: null,
                          }}
                          items={measurementUnits}
                          onValueChange={(value) => {
                            let ingredientsCopy = ingredients.slice();
                            ingredientsCopy[index].Unit = value;
                            setIngredients(ingredientsCopy);
                          }}
                          style={{ inputAndroid: { color: "black" } }}
                          value={ingredients[index].Unit}
                        />
                      </View>
                      <View style={{ flex: 0, marginRight: -23 }}>
                        <Pressable onPress={() => deleteIngredient(index)}>
                          <Entypo name="cross" size={30} color="red" />
                        </Pressable>
                      </View>
                      <View style={{ flex: 0.6 }}></View>
                    </View>
                  </View>
                );
              })}

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    paddingLeft: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={addIngredient}
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    <MaterialIcons name="add" size={30} color="red" />
                    <Text style={{ alignSelf: "center", color: "red" }}>
                      Add
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            ingredients.map((ingredient, index) => {
              return (
                <View
                  style={{ flexDirection: "row", alignItems: "center" }}
                  key={index}
                >
                  <View style={{ flex: 0.2, paddingLeft: 20 }}>
                    <Text>
                      {ingredient.Quantity} {ingredient.Unit}
                    </Text>
                  </View>
                  <View style={{ flex: 0.9 }}>
                    <Text>{ingredient.Name}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Instructions Input */}

        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.8 }}>
              <Text>Instructions (Required)</Text>
            </View>
            <View style={{ flex: 0.3, marginRight: -100 }}>
              {!editInstructions ? (
                <Pressable
                  onPress={() => setEditInstructions(true)}
                  style={{ paddingTop: 10 }}
                >
                  <MaterialIcons name="edit" size={25} />
                </Pressable>
              ) : (
                <View style={{ flex: 0.3 }}>
                  <Pressable
                    onPress={() => {
                      let instructionsCopy = instructions
                        .slice()
                        .filter((item) => item !== "");
                      setInstructions(instructionsCopy);
                      setEditInstructions(false);
                    }}
                    style={{ paddingTop: 10 }}
                  >
                    <Entypo name="check" size={25} />
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          {editInstructions ? (
            <View>
              {instructions.map((instruction, index) => {
                return (
                  <View key={index}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ flex: 0.1, paddingLeft: 0 }}>
                        <Text style={{ justifyContent: "center" }}>
                          {index + 1}.
                        </Text>
                      </View>
                      <View
                        style={{ flex: 2.5, paddingTop: 10, marginLeft: 5 }}
                      >
                        <View style={styles.input}>
                          <TextInput
                            placeholderTextColor="#444"
                            placeholder="Instruction"
                            multiline
                            onChangeText={(text) => {
                              let instructionsCopy = instructions.slice();
                              instructionsCopy[index] = text;
                              setInstructions(instructionsCopy);
                            }}
                            value={instructions[index]}
                            autoCapitalize="none"
                            textContentType="none"
                          />
                        </View>
                      </View>

                      <View style={{ flex: 0, marginRight: -80 }}>
                        <Pressable onPress={() => deleteInstruction(index)}>
                          <Entypo name="cross" size={30} color="red" />
                        </Pressable>
                      </View>
                      <View style={{ flex: 0.6 }}></View>
                    </View>
                  </View>
                );
              })}

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    paddingLeft: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={addInstruction}
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    <MaterialIcons name="add" size={30} color="red" />
                    <Text style={{ alignSelf: "center", color: "red" }}>
                      Add
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            instructions.map((instruction, index) => {
              return (
                <View
                  style={{ flexDirection: "row", alignItems: "center" }}
                  key={index}
                >
                  <View style={{ flex: 0.1 }}>
                    <Text style={{ justifyContent: "center", paddingLeft: 20 }}>
                      {index + 1}.
                    </Text>
                  </View>
                  <View style={{ flex: 0.9, paddingLeft: 10 }}>
                    <Text>{instruction}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.7 }}>
            <Text style={{ paddingTop: 10 }}>Privacy Setting</Text>
          </View>
          <View style={{ flex: 0.3, marginLeft: 170, paddingTop: 15 }}>
            <RNPickerSelect
              placeholder={{}}
              items={publicOrNot}
              onValueChange={(value) => {
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

        <View style={styles.bottomSpaceAdjust}></View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AddPostScreen;
