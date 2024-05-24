import { useEffect, useState } from 'react';
import { getMovieByKeyWord } from '../../API';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';

export default function MoviePage() {
  const [moviePage, setMoviePage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName') ?? '';
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieByKeyWord(movieName) {
      setLoading(true);
      try {
        const data = await getMovieByKeyWord(movieName);
        setMoviePage(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    if (movieName.trim() !== '') {
      fetchMovieByKeyWord(movieName);
    }
  }, [movieName]);

  const handleSubmit = query => {
    setSearchParams({ movieName: query });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ul className={css.wrap}>
        {moviePage.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.original_title || movie.name}
            </Link>
          </li>
        ))}
        {loading && <Loader />}
      </ul>
    </>
  );
}
