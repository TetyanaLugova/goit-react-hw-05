import { useState, useEffect } from 'react';
import { getTrendsMovies } from '../API';
import MoviesList from '../components/MovieList';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
 
    useEffect(() => {
        async function fetchMovies() {
        setLoading(try)
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
          <MoviesList movies={movies} />
           {/* {loading && <Loader />} */}
    </>
  )
}
