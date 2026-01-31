import { Modal, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import YouTube from "react-youtube";
import axios from "../api/axios";
import { addToList } from "../api/watchlist";


function MovieDetails({ movie, show, handleClose }) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const { user } = useContext(AuthContext); 

  if (!movie) return null; 


  const base_url = "https://image.tmdb.org/t/p/original/";

  const handlePlay = async () => {
    try {
      const type = movie.media_type === "tv" ? "tv" : "movie";

      const response = await axios.get(
        `/${type}/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );

      const trailer = response.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(trailer.key);
      } else {
        alert("Official trailer not available 😢");
      }
    } catch (err) {
      console.error("Trailer error:", err);
      alert("Error loading trailer");
    }
  };

 const handleAddToList = async () => {
  const token = user?.token;   // ✅ CORRECT TOKEN SOURCE
  if (!token) return alert("Login required");

  try {
    await addToList(
      {
        movieId: movie.id,
        title: movie.title || movie.name,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
      },
      token
    );
    alert("Added to My List ✅");
  } catch (err) {
    console.error("Add to list error:", err);
    alert("Already in My List ⚠️");
  }
};



  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setTrailerUrl("");
        handleClose();
      }}
      size="lg"
      centered
      contentClassName="bg-dark text-white border-0"
    >
      <div
        style={{
          position: "relative",
          height: "300px",
          backgroundImage: `url(${base_url}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Modal.Body>
        <h2>{movie.title || movie.name || movie.original_name}</h2>
        <p className="text-secondary">{movie.overview}</p>

        <Button variant="light" onClick={handlePlay} className="mb-3">
          ▶ Play Trailer
        </Button>
        <Button variant="secondary" onClick={handleAddToList}>
          + My List
        </Button>


        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </Modal.Body>
    </Modal>
  );
}

export default MovieDetails;
