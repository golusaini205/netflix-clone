import { useEffect, useState } from "react";
import { getList, removeFromList } from "../api/watchlist";

function MyList() {
  const [movies, setMovies] = useState([]);

  const fetchList = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) return alert("Please login again");

      const res = await getList(token);
      setMovies(res.data);
    } catch (err) {
      alert("Failed to load your list");
    }
  };

  const handleRemove = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await removeFromList(id, token);
      fetchList();
    } catch {
      alert("Failed to remove movie");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mt-4 text-white">
      <h2>My List</h2>

      {movies.length === 0 && <p>No movies saved yet</p>}

      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-3 mb-3">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "5px" }}
            />

            <h6 className="mt-2">{movie.title}</h6>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemove(movie._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;
