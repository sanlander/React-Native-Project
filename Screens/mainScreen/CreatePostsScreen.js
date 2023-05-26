import React, { useState } from "react";
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

const initialState = {
  title: "",
  location: "",
};

export const CreatePostsScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const onPressSubmit = () => {
    onPressWithoutFeedback();

    // console.log("Submit login:", state);
    // setState(initialState);
  };

  const onPressWithoutFeedback = () => {
    setIsShowKeyboard(false);
    // setActiveInput({});
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onPressWithoutFeedback}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View
            style={{ ...styles.photoBox, marginTop: isShowKeyboard ? 5 : 32 }}
          >
            <Image source={require("../../assets/circle.png")}></Image>
          </View>

          <Text style={styles.downloadPhoto}>Завантажте фото..</Text>

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
              value={state.title}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, title: value }))
              }
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
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              value={state.location}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, location: value }))
              }
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.btnSubmit,
              marginTop: isShowKeyboard ? 10 : 20,
            }}
            onPress={onPressSubmit}
          >
            <Text style={styles.btnSubmitTitle}>Опубліковати</Text>
          </TouchableOpacity>

          <View style={{ alignItems: "center", marginTop: 35 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnDelete}
              // onPress={onPressDelete}
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
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  btnSubmitTitle: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  btnDelete: {
    marginTop: 20,
    height: 51,
    width: 70,
    marginHorizontal: "auto",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
});
