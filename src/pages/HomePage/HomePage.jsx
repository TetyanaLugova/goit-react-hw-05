import { useState, useEffect } from 'react';
import { getTrendsMovies } from '../../API';
import MoviesList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMassage/ErrorMassage';

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
    <>
      <h1>Trending today</h1>
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      <MoviesList movies={movies} />
    </>
  );
}
