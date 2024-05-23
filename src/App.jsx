import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'path/to/pages/HomePage';
import MoviesPage from 'path/to/pages/MoviesPage';
import MovieDetailsPage from 'path/to/pages/MovieDetailsPage';
import MovieCast from 'path/to/pages/MovieCast';
import MovieReviews from 'path/to/pages/MovieReviews';
import NotFoundPage from 'path/to/pages/NotFoundPage';

function App() {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={}>
          HomePage
        </NavLink>
        <NavLink to="/movies" className={}>
          MoviesPage
        </NavLink>
        <NavLink to="/movies/:movieId" className={}>
          MovieDetailsPage
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="/movies/:movieId/cast" element={<MovieCast />} />
          <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
