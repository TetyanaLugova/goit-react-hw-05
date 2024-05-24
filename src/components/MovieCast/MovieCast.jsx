import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from '../../API';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMassage/ErrorMassage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const defaultImg =
    '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

  useEffect(() => {
    async function fetchMovieCast(movieId) {
      setLoading(true);
      try {
        const data = await getCast(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCast(movieId);
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (!movieCast || movieCast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <>
      <ul className={css.list}>
        {movieCast.map(({ id, original_name, profile_path, character }) => (
          <li className={css.item} key={id}>
            <div>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : defaultImg
                }
                alt={original_name}
              />
            </div>
            <div>
              <h2 className={css.name}>{original_name}</h2>
              <p className={css.character}>Charaster: {character}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
