import './App.css';
import {Auth} from "./components/Auth";
import {auth, db} from "./config/firebase"
import {useEffect, useState} from "react";
import {addDoc, collection, getDocs} from "firebase/firestore"
import {MovieItem} from "./components/MovieItem";

function App() {

    const [movieList, setMovieLIst] = useState([]);

    const moviesCollectionRef = collection(db, "movies")

    //new movie states
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [newReceivedOscar, setNewReceivedOscar] = useState(false);

    const onsubmitMovie = async () => {

        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                recievedOscar: newReceivedOscar,
                userId: auth?.currentUser?.uid,
            });
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
                <MovieItem movie={movie}/>
            ))}</div>
        </div>
    );
}

export default App;
