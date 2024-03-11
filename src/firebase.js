// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnUfKDgZf8hanKMA1DIrzhVZyE7HOMD5A",
  authDomain: "fitness-pro-9efbb.firebaseapp.com",
  databaseURL: "https://fitness-pro-9efbb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-pro-9efbb",
  storageBucket: "fitness-pro-9efbb.appspot.com",
  messagingSenderId: "986522955912",
  appId: "1:986522955912:web:692750562c74adb321af3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);

export { auth };

// export const auth = getAuth(app)