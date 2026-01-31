import axios from "axios";

const API = "http://localhost:3000/api/watchlist";

export const getList = (token) =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addToList = (movie, token) =>
  axios.post(`${API}/add`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const removeFromList = (movieId, token) =>
  axios.delete(
    `${API}/remove`,
    { movieId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
