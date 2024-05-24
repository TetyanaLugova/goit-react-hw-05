import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../API';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMassage/ErrorMassage';
import css from './Moviereviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovieReviews(movieId, page) {
      setLoading(true);
      try {
        const data = await getReviews(movieId, page);
        setMovieReviews(prevReviews => [...prevReviews, ...data.results]);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReviews(movieId, page);
  }, [movieId, page]);

  if (loading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorMessage />;
  }
  if (!movieReviews || movieReviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <>
      <ul className={css.list}>
        {movieReviews.map(({ id, author, content }) => (
          <li key={id}>
            <div>
              <h2>{author}</h2>
              <p>{content}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
