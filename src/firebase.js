//Web version 8
// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUfV9Rn0tgk-sVwoGnrlRPHC9B54346OY",
  authDomain: "chatapp-react-17ab5.firebaseapp.com",
  projectId: "chatapp-react-17ab5",
  storageBucket: "chatapp-react-17ab5.appspot.com",
  messagingSenderId: "223864100929",
  appId: "1:223864100929:web:69bda0ea073ed157014ec0",
  measurementId: "G-C56GDHDXCY",
};

firebase.initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();

export default firebase;

// //storage
// export async function upload(file, currentUser, setLoading) {
//   const fileRef = ref(storage, currentUser.uid + ".png");

//   const snapshot = await uploadBytes(fileRef, file);
// }
