import { useState, useEffect } from "react";
import api from "../api";
import Movie from "../components/Movie"; // Assuming you have a Movie component
import "../styles/Home.css";
import CreateMovie from './Createpost'; // Assuming you have a CreateMovie component
import Navbar from "./Navbar";

function Home() {
    const [movies, setMovies] = useState([]);
   
    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        api
            .get("/api/movies/")
            .then((res) => res.data)
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => alert(err));
    };

    const deleteMovie = (id) => {
        api
            .delete(`/api/movies/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Movie deleted!");
                else alert("Failed to delete movie.");
                getMovies();
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <Navbar />
            <CreateMovie />
            <div className="movies-section">
                <h2>Movies</h2>
                {movies.map((movie) => (
                    <Movie movie={movie} onDelete={deleteMovie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;
