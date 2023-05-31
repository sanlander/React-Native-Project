import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { postId } = route.params;
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const createPost = async () => {
    onPressWithoutFeedback();

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login });
  };

  const onPressWithoutFeedback = () => {
    setIsShowKeyboard(false);

    Keyboard.dismiss();
  };

  const onPressAddComment = () => {
    onPressWithoutFeedback();
  };

  return (
    <TouchableWithoutFeedback onPress={onPressWithoutFeedback}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text>{item.login}</Text>
                <Text>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={createPost}
            style={{
              ...styles.sendBtn,
              marginBottom: isShowKeyboard ? 150 : 20,
            }}
          >
            <Text style={styles.sendLabel}>Add comment</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#20b2aa",
  },
});

export default CommentsScreen;
