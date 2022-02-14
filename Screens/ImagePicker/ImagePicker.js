import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
//import storage from 'firebase/compat/storage';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
//import * as Progress from 'react-native-progress';
import { FontAwesome, MaterialIcons } from "react-native-vector-icons";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { ImageManipulator } from "expo";
import CachedImage from "react-native-expo-cached-image";

export default function PhotoUpload({ setImageUrlCallback, url }) {
  const uploadOrTakePic = [
    {
      label: "Select photo option...",
      value: "",
    },
    {
      label: "Select Image From Library",
      value: false,
    },
    {
      label: "Take Picture",
      value: true,
    },
  ];

  const [upload, setImageUpload] = useState(false);
  const [imageSetting, setImageSetting] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const closeImageEdit = () => {
    setImageUrlCallback(imageUrl);
  };

  useEffect(async () => {
    setCameraPermission(await ImagePicker.getCameraPermissionsAsync());
    if (url) {
      setImage({ uri: url });
      setImageUrl(url);
    }
  }, []);

  const selectImage = async () => {
    const options = {
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  const takePicture = async () => {
    if (cameraPermission.status !== "granted") {
      const newPermission = await ImagePicker.requestCameraPermissionsAsync();

      setCameraPermission(newPermission);

      if (newPermission.status !== "granted") {
        alert("Permission for media access needed.");
        return;
      }
    }

    const options = {
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${filename}`);

    const img = await fetch(uploadUri);
    const bytes = await img.blob();
    await uploadBytesResumable(storageRef, bytes);

    await getDownloadURL(ref(storageRef))
      .then((url) => {
        setUploading(false);
        setImageUrl(url);
        setImageUrlCallback(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cam}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={selectImage} style={{ paddingRight: 10 }}>
            <FontAwesome name="picture-o" size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={{ paddingLeft: 10 }}>
            <MaterialIcons name="add-a-photo" size={50} />
          </TouchableOpacity>
        </View>

        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {!image ? null : (
          <View style={styles.confirm}>
            <TouchableOpacity style={{ marginBottom: -10 }}>
              <Button onPress={uploadImage} title="Upload" style={styles.btn} />
            </TouchableOpacity>
            <Text style={{ color: "gray", fontSize: 27 }}>{` | `}</Text>
            <TouchableOpacity style={{ paddingTop: -30 }}>
              <Button
                onPress={closeImageEdit}
                title="Cancel"
                style={styles.btn}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageBox: {
    width: 300,
    height: 300,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  cam: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingTop: 20,
    alignItems: "center",
  },
  btn: {
    borderWidth: 4,
  },
  confirm: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -10,
    paddingTop: -10,
  },
});
