import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDFYbZB8oyjNOkZc6gNsGVdJTZAymin6Pk",
    authDomain: "learn-cloud-functions-firebase.firebaseapp.com",
    projectId: "learn-cloud-functions-firebase",
    storageBucket: "learn-cloud-functions-firebase.appspot.com",
    messagingSenderId: "239924777020",
    appId: "1:239924777020:web:39a58e01fa2d587fd4b339",
    measurementId: "G-HENZ5EZ4NP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
