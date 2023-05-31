import React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "../mainScreen/ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

export default Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());

    navigation.navigate("Login");
  };

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          title: "Публікації",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 17,
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={signOut}>
              <Image
                source={require("../../assets/images/log-out.png")}
              ></Image>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Створити публікацію",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 17,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.createPostIcon}>
              <AntDesign name="plus" size={size} color="#FFFFFF" />
            </View>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Профіль",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 17,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  createPostIcon: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
