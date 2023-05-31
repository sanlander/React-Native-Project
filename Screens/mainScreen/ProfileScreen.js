import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

const ProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  return (
    <View style={styles.container}>
       <FlatList
        data={userPosts}
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
                       navigation.navigate("DefaultScreen")
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
                      navigation.navigate("DefaultScreen")
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

export default ProfileScreen;
