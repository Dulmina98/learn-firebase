import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDvV1n7iwfnHr5HrdfadD0E0i60TlSUD8M",
    authDomain: "learn-firebase-course.firebaseapp.com",
    projectId: "learn-firebase-course",
    storageBucket: "learn-firebase-course.appspot.com",
    messagingSenderId: "227863067123",
    appId: "1:227863067123:web:ef51630d3b418984d7ba86",
    measurementId: "G-4JKX18HYEM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();