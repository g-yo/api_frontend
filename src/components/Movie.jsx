import React from "react";
import "../styles/Form.css"; // Import the CSS file

function Movie({ movie = {}, onDelete }) {
    // Check if movie object and title property are defined
    const formattedDate = movie.created_at ? new Date(movie.created_at).toLocaleDateString("en-US") : "";
    const title = movie.title || "Untitled"; // Provide a default title if not available

    // Generate star icons based on the rating
    const stars = [];
    for (let i = 0; i < movie.rating; i++) {
        stars.push(<img key={i} src="/star.png" alt="star" style={{ width: "20px", height: "20px" }} />);
    }

    return (
        <div className="movie-container">
            <div className="image-rating-container">
                {movie.image && (
                    <div className="image-container">
                        <img className="note-image" src={movie.image} alt={title} style={{ width: "100px", height: "auto" }} />
                    </div>
                )}
                <div className="rating-container">
                    <p className="note-description">Rating:</p>
                    <div>{stars}</div>
                </div>
            </div>
            <div className="note-container">
                <p className="note-title" style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "24px" }}>{title}</p>
                <p className="note-description">Genre: {movie.genre}</p>
                <p className="note-description">Year: {movie.year}</p>
                <p className="note-description">{movie.description}</p>
                <button className="delete-button" onClick={() => onDelete(movie.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Movie;
