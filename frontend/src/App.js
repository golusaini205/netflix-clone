import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AppNavbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./api/requests";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {
  const { user } = useContext(AuthContext);

  const categories = [
    { title: "NETFLIX ORIGINALS", url: requests.fetchNetflixOriginals, large: true },
    { title: "Trending Now", url: requests.fetchTrending },
    { title: "Top Rated", url: requests.fetchTopRated },
    { title: "Action Movies", url: requests.fetchActionMovies },
    { title: "Comedy Movies", url: requests.fetchComedyMovies },
    { title: "Horror Movies", url: requests.fetchHorrorMovies },
    { title: "Romance Movies", url: requests.fetchRomanceMovies },
    { title: "Documentaries", url: requests.fetchDocumentaries }
  ];

  return (
  <Router>
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          user ? (
            <>
              <AppNavbar />
              <Banner />
              {categories.map((cat, i) => (
                <Row
                  key={i}
                  title={cat.title}
                  fetchUrl={cat.url}
                  isLargeRow={cat.large}
                />
              ))}
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  </Router>
);

}

export default App;
