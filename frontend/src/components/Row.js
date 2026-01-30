import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import MovieDetails from './MovieDetails';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row ms-2">
      <h2 className="text-white mt-4">{title}</h2>
      <div className="d-flex overflow-auto p-2 no-scrollbar">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="movie-card m-1"
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            style={{ height: isLargeRow ? "250px" : "150px" }}
          />
        ))}
      </div>
      <MovieDetails 
        movie={selectedMovie} 
        show={!!selectedMovie} 
        handleClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}

export default Row;