import { useState, useEffect } from 'react';
import { getTrendsMovies } from '../../API';
import MoviesList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMassage/ErrorMassage';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const data = await getTrendsMovies();
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.wrap}>
      <h1 className={css.title}>Trending today</h1>
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      <MoviesList movies={movies} />
    </div>
  );
}
