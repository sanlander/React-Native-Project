import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto_500: require("../../assets/fonts/Roboto-Medium.ttf"),
    Roboto_400: require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState({});
  const [isSecurePassword, setIsSecurePassword] = useState(true);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      const widthNew = window.width - 16 * 2;

      setDimensions(widthNew);
    });

    return () => subscription?.remove();
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onPressSubmit = () => {
    navigation.push("Home");
    onPressWithoutFeedback();

    console.log("Submit register:", state);
    setState(initialState);
  };

  const onPressWithoutFeedback = () => {
    setIsShowKeyboard(false);
    setActiveInput({});
    Keyboard.dismiss();
  };

  if (state.password.length === 0 && !isSecurePassword) {
    setIsSecurePassword(true);
  }

  return (
    <TouchableWithoutFeedback
      onPress={onPressWithoutFeedback}
      onLayout={onLayoutRootView}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/Photo-BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View style={styles.form}>
              <View style={styles.headerLogo}>
                <Image
                  style={styles.headerAddLogoBtn}
                  source={require("../../assets/images/add.png")}
                ></Image>
                <Text>logo user</Text>
              </View>

              <Text
                style={{
                  ...styles.headerTitle,
                  marginTop: isShowKeyboard ? 60 : 92,
                }}
              >
                Реєстрація
              </Text>

              <View
                style={{
                  ...styles.inputBox,
                  marginTop: isShowKeyboard ? 10 : 32,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: activeInput.login ? "#FF6C00" : "#E8E8E8",
                    width: dimensions,
                  }}
                  placeholder={"Логін"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setActiveInput({ login: true });
                  }}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View
                style={{
                  ...styles.inputBox,
                  marginTop: 16,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    width: dimensions,
                    borderColor: activeInput.email ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Електронна пошта"}
                  inputMode={"email"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setActiveInput({ email: true });
                  }}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View
                style={{
                  ...styles.inputBox,
                  marginTop: 16,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    width: dimensions,
                    borderColor: activeInput.password ? "#FF6C00" : "#E8E8E8",
                  }}
                  selectionColor={"#FF6C00"}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  secureTextEntry={isSecurePassword}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setActiveInput({ password: true });
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity
                  style={styles.btnShowPassword}
                  onPress={() => setIsSecurePassword(!isSecurePassword)}
                >
                  <Text style={styles.textShowPassword}>
                    {isSecurePassword ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btnSubmit,
                  width: dimensions,
                  marginTop: isShowKeyboard ? 15 : 43,
                }}
                onPress={onPressSubmit}
              >
                <Text style={styles.btnSubmitTitle}>Зареєструватися</Text>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: isShowKeyboard ? 5 : 20,
                  marginBottom: isShowKeyboard ? 5 : 78,
                }}
              >
                <TouchableOpacity>
                  <Text
                    onPress={() => navigation.push("Login")}
                    style={styles.linkText}
                  >
                    Уже є аккаунт? Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  headerLogo: {
    position: "absolute",
    top: -60,
    height: 120,
    width: 120,
    borderRadius: 16,
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },

  headerAddLogoBtn: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },

  headerTitle: {
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto_500",
    fontWeight: 500,
    letterSpacing: 1.1,
  },

  inputBox: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    height: 50,
    paddingHorizontal: 16,
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto_400",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
  },

  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: 15,
  },

  textShowPassword: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto_400",
  },

  btnSubmit: {
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },

  btnSubmitTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto_400",
  },

  linkText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto_400",
  },
});
