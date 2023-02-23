import "./auth.css"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {useState} from "react";
import {auth, googleProvider} from "../config/firebase";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.photoURL)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }

    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }

    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={"input-fields"}>
            <div className={"input-item"}>
                <input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={"input-item"}>
                <input type="password" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={"input-item"}>
                <button onClick={signIn}>Sign in</button>
                <button onClick={logOut}>Log out</button>
            </div>

            <div className="input-item">
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </div>
    )
}