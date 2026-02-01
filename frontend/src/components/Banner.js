import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  


const handlePlay = async () => {
  if (!movie) return;

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
    console.error("Trailer fetch error:", err);
    alert("Error loading trailer");
  }
};


  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        setMovie(randomMovie);
      } catch (err) {
        console.error("Banner error:", err);
      }
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
  <>
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original/${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button" onClick={handlePlay}>
            ▶ Play
          </button>

        </div>

        <p className="banner-description">
          {truncate(movie?.overview, 150)}
        </p>
      </div>

      <div className="banner-fadeBottom" />
    </header>

    {trailerUrl && (
      <div style={{ padding: "20px", backgroundColor: "#111" }}>
        <YouTube
          videoId={trailerUrl}
          opts={{
            height: "390",
            width: "100%",
            playerVars: { autoplay: 1 },
          }}
        />
      </div>
    )}
  </>
);

}

export default Banner;
