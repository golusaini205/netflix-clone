import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AppNavbar from './components/Navbar';
import Row from './components/Row';
import requests from './api/requests';
import Login from './pages/Login';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {!user ? <Login /> : (
        <>
          <AppNavbar />
          <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        </>
      )}
    </div>
  );
}

export default App;