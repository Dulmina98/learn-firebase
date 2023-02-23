import "./auth.css"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {useState} from "react";
import {auth, googleProvider} from "../config/firebase";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isUserLogin = auth?.currentUser;

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

            {!isUserLogin ?
                <>
                    <div className={"input-item"}>
                        <input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={"input-item"}>
                        <input type="password" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </> : <div>
                    {auth?.currentUser?.displayName}
                </div>}
            <div className={"input-item"}>
                {!isUserLogin && <button onClick={signIn}>Sign in</button>}
                {isUserLogin ?
                    <button onClick={logOut}>Log out</button> : null}
            </div>

            <div className="input-item">
                {!isUserLogin && <button onClick={signInWithGoogle}>Sign in with Google</button>}
            </div>

        </div>
    )
}