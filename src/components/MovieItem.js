import {useState} from "react";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {auth, db} from "../config/firebase";

export function MovieItem(props: { movie: any }) {

    const [updatedTitle, setUpdatedTitle] = useState("");

    const deleteMovie = async (id) => {
        if (!auth.currentUser) {
            console.log("User is not authenticated");
            return;
        }

        const movieDoc = doc(db, "movies", id)
        try {
            await deleteDoc(movieDoc);
        } catch (err) {
            console.log(err)
        }
    }

    const updateMovieTitle = async (id,) => {

        const movieDoc = doc(db, "movies", id)
        try {
            await updateDoc(movieDoc, {title: updatedTitle});
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <h1>{props.movie.title}</h1>
            <div>Date: {props.movie.releaseDate}</div>
            <div>Is oscar win: {props.movie.recievedOscar ? "Yes" : "No"}</div>
            <button onClick={() => deleteMovie(props.movie.id)}>Delete Movie</button>
            <div>
                <input type="text" placeholder={"Update title"}
                       onChange={(e) => setUpdatedTitle(e.target.value)}/>
                <button onClick={() => updateMovieTitle(props.movie.id)}>Update Title</button>
            </div>
        </div>
    )
}