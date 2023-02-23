import './App.css';
import {Auth} from "./components/Auth";
import {db} from "./config/firebase"
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore"

function App() {

    const [movieList, setMovieLIst] = useState([]);

    const moviesCollectionRef = collection(db, "movies")

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
    }, []);

    return (
        <div className="App">
            <Auth/>

            <div>{movieList.map((movie) => (
                <div>
                    <h1>{movie.title}</h1>
                    <div>Date: {movie.releaseDate}</div>
                    <div>Is oscar win: {movie.recievedOscar ? "Yes" : "No"}</div>
                </div>
            ))}</div>
        </div>
  );
}

export default App;
