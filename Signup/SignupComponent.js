import { auth } from '../firebase_config'
import { createUserWithEmailAndPassword } from "firebase/auth";

import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  KeyboardAvoidingView
} from "react-native";
import styles from "./SignupStyle"

function SignupComponent({navigation}) {

  const [email, setEmail] = useState('')
  //const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {
    try{
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        navigation.replace('Homepage')
      })
      .catch(error => alert(error.message))
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.logo}>
            <Image
              source={{
                uri: "https://uspto.report/TM/90307472/mark.png",
                height: 150,
                width: 150,
              }}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              placeholderTextColor="#444"
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
            />

          </View>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <Pressable
          titleSize={20}
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}> Sign up </Text>
        </Pressable>
        <View style={styles.signupContainer}>
          <Text>Already have an account?</Text>
          <Pressable>
            <Text style={{ color: "#6BB0F5" }} onPress={() => navigation.navigate('Login')}>Login</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupComponent;
