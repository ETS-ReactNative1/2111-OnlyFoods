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

export default function PhotoUpload({ setImageUrlCallback, url }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const closeImageEdit = () => {
    setImageUrlCallback(imageUrl);
  };

  useEffect(() => {
    if (url !== "") setImage({ uri: url });
  }, []);

  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  const takePicture = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
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
    //const ref = ref(storage, filename);
    const storageRef = ref(storage, `images/${filename}`);

    //convert image to array of bytes
    // const img = await fetch(image.uri);
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity style={styles.selectButton} onPress={takePicture}>
            <Text style={styles.buttonText}>Take a Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {!image ? null : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={uploadImage}
              >
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={closeImageEdit}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#8ac6d1",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#ffb6b9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});
