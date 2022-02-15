import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput,
  SafeAreaView,
} from "react-native";
import {
  FontAwesome,
  Feather,
  Icons,
  Ionicons,
} from "react-native-vector-icons";
import React from "react";
import { useTheme } from "react-native-paper";
import { auth, db } from "../../firebase_config";
import {
  getAuth,
  sendSignInLinkToEmail,
  signOut,
  updateEmail,
  updatePassword,
  updateUserWithEmailAndPassword,
} from "firebase/auth";

const EditProfileScreen = ({ navigation, route }) => {
  //console.log(route.params);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView styles={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          title="Back"
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../../Assets/Cook1.png")}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                ></ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {route.params.LoggedInUsername}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="black"
              autoCorrect={false}
              style={
                (styles.textInput,
                {
                  marginLeft: 5,
                })
              }
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              keyboardType="email-address"
              autoCorrect={false}
              autoCorrect={false}
              style={
                (styles.textInput,
                {
                  marginLeft: 5,
                })
              }
            />
          </View>
          <View style={styles.action}>
            <Feather name="lock" size={20} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              autoCorrect={false}
              style={
                (styles.textInput,
                {
                  marginLeft: 5,
                })
              }
            />
          </View>
          <TouchableOpacity style={styles.commandBtnOne} onPress={() => {}}>
            <Text style={styles.panelBtnTitleOne}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandBtnTwo} onPress={handleLogOut}>
            <Text style={styles.panelBtnTitleTwo}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  commandBtnOne: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginTop: 10,
    // width: 100,
    // height: 40,
  },
  commandBtnTwo: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: "red",
    // width: 100,
    // height: 40,
  },
  panel: {
    padding: 20,
    backgroundColor: "#fae1dd",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#fae1dd",
    shadowColor: "black",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fae1dd",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubTitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelBtn: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: "#fae1dd",
    alignItems: "center",
    marginVertical: 7,
  },
  panelBtnTitleOne: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  panelBtnTitleTwo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "red",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "pink",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "maroon",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    color: "brown",
  },
  back: {
    marginLeft: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "gray",
  },
});
