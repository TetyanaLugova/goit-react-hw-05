import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

export default function Navigation() {
  const getLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <nav className={css.container}>
      <ul>
        <li>
          <NavLink to="/" className={getLinkClass}>
            HomePage
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getLinkClass}>
            MoviesPage
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
