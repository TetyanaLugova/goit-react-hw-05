import { Link, useLocation } from 'react-router-dom';

export default function MoviesList({ movies }) {
  const location = useLocation();
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
