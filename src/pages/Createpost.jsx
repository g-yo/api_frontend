import React, { useState } from "react";
import api from "../api";
import getMovies from './Home';
import "../styles/Home.css"; // Import the CSS file

function CreateMovie() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [year, setYear] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const createMovie = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("rating", rating);
        formData.append("year", year);
        formData.append("image", image);

        try {
            const res = await api.post("/api/movies/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                alert("Movie created!");
                getMovies();
            } else {
                alert("Failed to create movie.");
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="create-movie-container">
            <h2 className="moviehd">Add Movie</h2>
            <form onSubmit={createMovie} encType="multipart/form-data">
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />

                <label htmlFor="description">Description:</label>
                <br />
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <br />

                <label htmlFor="genre">Genre:</label>
                <br />
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                />
                <br />

                <label htmlFor="rating">Rating:</label>
                <br />
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="0"
                    max="5"
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                />
                <br />

                <label htmlFor="year">Year:</label>
                <br />
                <input
                    type="text"
                    id="year"
                    name="year"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                />
                <br />

                <label htmlFor="image">Select an Image:</label>
                <br />
                <input
                    type="file"
                    id="image"
                    name="image"
                    required
                    onChange={handleImageChange}
                />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreateMovie;
