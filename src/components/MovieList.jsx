export default function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
}
