import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import db from "../../firebase/config";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            style={styles.headerLogo}
            source={require("../../assets/images/user_logo.png")}
          ></Image>
        </View>
        <View style={styles.headerInfo}>
          <Text style={{ ...styles.headerInfoText, fontWeight: 700 }}>
            Natali Romanova
          </Text>
          <Text
            style={{ ...styles.headerInfoText, fontSize: 11, opacity: 0.8 }}
          >
            email@example.com
          </Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{}}>
            <View style={styles.post}>
              <Image
                style={styles.postImg}
                source={{ uri: item.photoDb }}
              ></Image>

              <Text style={styles.posTitle}>{item.adress.street}</Text>

              <View style={styles.description}>
                <View style={styles.comments}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", { postId: item.id })
                    }
                  >
                    <Image
                      style={{ marginRight: 8 }}
                      source={require("../../assets/message-circle.png")}
                    ></Image>
                  </TouchableOpacity>
                  <Text style={styles.commentsText}>8</Text>
                </View>
                <View style={styles.likes}>
                  <Image
                    style={{ marginRight: 8 }}
                    source={require("../../assets/thumbs-up.png")}
                  ></Image>
                  <Text style={styles.commentsText}>12</Text>
                </View>

                <View style={styles.location}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    <Image
                      style={{ marginRight: 8 }}
                      source={require("../../assets/map-pin.png")}
                    ></Image>
                  </TouchableOpacity>
                  <Text style={styles.locationText}>
                    {`${item.adress.city}, ${item.adress.country}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 32,
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  headerInfo: {
    justifyContent: "center",
    marginLeft: 10,
  },
  headerInfoText: {
    fontSize: 13,
    color: "#212121",
  },
  post: {
    marginBottom: 80,
    height: 240,
  },
  postImg: {
    borderRadius: 8,
    marginBottom: 8,
    height: "100%",
  },
  posTitle: {
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
    marginBottom: 11,
  },
  description: { display: "flex", flexDirection: "row" },
  comments: { display: "flex", flexDirection: "row" },
  commentsText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#212121",
    marginRight: 24,
  },
  likes: { display: "flex", flexDirection: "row" },
  location: { marginLeft: "auto", display: "flex", flexDirection: "row" },
  locationText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default DefaultScreenPosts;
