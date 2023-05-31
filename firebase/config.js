import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBm2DSh9yqsZKwculnfEBTncRtKSvBrxOs",
  authDomain: "react-native-70602.firebaseapp.com",
  projectId: "react-native-70602",
  storageBucket: "react-native-70602.appspot.com",
  messagingSenderId: "198716521811",
  appId: "1:198716521811:web:66073c1071f5892fc4b5a6",
  measurementId: "G-J3MDXZ6PZ8",
};

export default firebase.initializeApp(firebaseConfig);
