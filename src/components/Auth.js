import "./auth.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {useState} from "react";
import {auth} from "../config/firebase";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }

    };

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
            </div>

        </div>
    )
}