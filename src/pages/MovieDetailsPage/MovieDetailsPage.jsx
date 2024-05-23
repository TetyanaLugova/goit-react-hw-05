import { useEffect, useState, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { getMovieById } from '../../API';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMassage/ErrorMassage';

export default function MoviePage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const from = location.state?.from || '/';

  useEffect(() => {
    async function fetchMovieDetails(movieId) {
      setLoading(true);
      try {
        const data = await getMovieById(movieId);
        setMovieDetails(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails(movieId);
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (!movieDetails) {
    return null;
  }

  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetails;
  const scoreToFixed = Number(vote_average).toFixed(2);

  return (
    <>
      <Link to={from}>Go back</Link>
      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : `http://www.suryalaya.org/images/no_image.jpg`
          }
          loading="lazy"
          alt="Movie poster"
        />
        <div>
          <h1>{original_title}</h1>
          <p>User score: {scoreToFixed}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul>
            {genres &&
              genres.length &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ ...location.state }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ ...location.state }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
