import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDozEz-xUhqPbi9hvV6aMxqNXUTuMw9G_I",
    authDomain: "learn-firebase-v2.firebaseapp.com",
    projectId: "learn-firebase-v2",
    storageBucket: "learn-firebase-v2.appspot.com",
    messagingSenderId: "582329513043",
    appId: "1:582329513043:web:94391807e21efdf6c802a6",
    measurementId: "G-G2XPPBJQ61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
