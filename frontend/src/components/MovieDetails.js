import { Modal, Button } from 'react-bootstrap';

function MovieDetails({ movie, show, handleClose }) {
  if (!movie) return null;

  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered contentClassName="bg-dark text-white border-0">
      <div style={{
        position: 'relative',
        height: '300px',
        backgroundImage: `url(${base_url}${movie.backdrop_path})`,
        backgroundSize: 'cover'
      }} />
      <Modal.Body>
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
        <Button variant="light">Play</Button>
      </Modal.Body>
    </Modal>
  );
}

export default MovieDetails;