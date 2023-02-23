import './App.css';
import {Auth} from "./components/Auth";
import {db} from "./config/firebase"
import {useEffect, useState} from "react";
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore"

function App() {

    const [movieList, setMovieLIst] = useState([]);

    const moviesCollectionRef = collection(db, "movies")

    //new movie states
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [newReceivedOscar, setNewReceivedOscar] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");

    const onsubmitMovie = async () => {

        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                recievedOscar: newReceivedOscar
            });
        } catch (err) {
            console.log(err)
        }
    }

    const deleteMovie = async (id) => {
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


    useEffect(() => {
        const getMovieList = async () => {

            //Read the data
            //Set movie list
            try {
                const data = await getDocs(moviesCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setMovieLIst(filteredData);
            } catch (err) {
                console.log(err)
            }
        }
        getMovieList();
    }, [onsubmitMovie]);


    return (
        <div className="App">
            <Auth/>


            <div className={"submit-movie"}>
                <input type="text" placeholder={"Movie title"} onChange={(e) => setNewMovieTitle(e.target.value)}/>
                <input type="number" placeholder={"Release date"}
                       onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
                <label>Received an oscar</label>
                <input type="checkbox" checked={newReceivedOscar}
                       onChange={(e) => setNewReceivedOscar(e.target.checked)}/>
                <button onClick={onsubmitMovie}>Submit movie</button>
            </div>

            <div>{movieList.map((movie) => (
                <div>
                    <h1>{movie.title}</h1>
                    <div>Date: {movie.releaseDate}</div>
                    <div>Is oscar win: {movie.recievedOscar ? "Yes" : "No"}</div>
                    <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
                    <div>
                        <input type="text" placeholder={"Update title"}
                               onChange={(e) => setUpdatedTitle(e.target.value)}/>
                        <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
                    </div>
                </div>
            ))}</div>
        </div>
    );
}

export default App;
