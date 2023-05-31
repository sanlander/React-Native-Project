import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import db from "../../firebase/config";

export default CreatePostsScreen = ({ navigation }) => {
  const [isReadyPost, setIsReadyPost] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [adress, setAdress] = useState(null);
  const [loader, setLoader] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    setLoader(true);
    Keyboard.dismiss();

    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);

    const currentAdress = await Location.reverseGeocodeAsync(coords);
    setAdress(currentAdress[0]);

    setIsReadyPost(false);
    setLoader(false);
  };

  const onPressSubmit = () => {
    uploadPostToServer();

    onPressWithoutFeedback();
    navigation.navigate("DefaultScreen");

    onClearPostInfo();
  };

  const uploadPostToServer = async () => {
    const photoDb = await uploadPhotoToServer();

    await db
      .firestore()
      .collection("posts")
      .add({ photoDb, location, adress, userId, login });
    console.log("Upload GOOD");
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const onClearPostInfo = () => {
    setIsReadyPost(true);
    setPhoto(null);
    setLocation(null);
    setAdress(null);
  };

  const onPressWithoutFeedback = () => {
    setIsShowKeyboard(false);

    Keyboard.dismiss();
  };

  if (hasPermission === null) {
    return <View style={{}} />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={onPressWithoutFeedback}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Camera
            style={{ ...styles.photoBox, marginTop: isShowKeyboard ? 5 : 32 }}
            ref={setCamera}
          >
            {photo && (
              <View style={{ height: "100%", width: "100%" }}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={takePhoto}
              style={{ position: "absolute" }}
            >
              <Image
                style={{ opacity: 0.4 }}
                source={require("../../assets/circle.png")}
              ></Image>
            </TouchableOpacity>
          </Camera>

          <Text style={styles.downloadPhoto}>
            {photo ? "Редагувати фото.." : "Завантажте фото.."}
          </Text>

          <View
            style={{
              ...styles.inputBox,
              marginTop: isShowKeyboard ? 5 : 48,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"Назва..."}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              value={adress && adress.street}
              disabled={true}
            />
          </View>
          <View
            style={{
              ...styles.inputBox,
              marginTop: isShowKeyboard ? 5 : 10,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"Місцевість..."}
              placeholderTextColor={"#BDBDBD"}
              value={
                adress &&
                `${adress.city}, ${adress.country}, ${adress.isoCountryCode}`
              }
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.btnSubmit,
              marginTop: isShowKeyboard ? 10 : 20,
              backgroundColor: isReadyPost ? "#F6F6F6" : "#FF6C00",
            }}
            onPress={onPressSubmit}
            disabled={isReadyPost}
          >
            <Text
              style={{
                ...styles.btnSubmitTitle,
                color: isReadyPost ? "#BDBDBD" : "white",
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 300,
              position: "absolute",
              left: 90,
              display: loader ? "flex" : "none",
            }}
          >
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../../assets/images/loader.gif")}
            ></Image>
          </View>

          <View style={{ alignItems: "center", marginTop: 35 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.btnDelete,
                backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={onClearPostInfo}
            >
              <Image source={require("../../assets/trash.png")}></Image>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },

  photoBox: {
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },

  downloadPhoto: {
    marginTop: 8,
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputBox: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  btnSubmit: {
    height: 51,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSubmitTitle: {
    fontSize: 16,
  },
  btnDelete: {
    marginTop: 10,
    height: 51,
    width: 70,
    marginHorizontal: "auto",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
