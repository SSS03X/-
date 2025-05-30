import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Toolbar.module.css';

const Toolbar = () => (
  <header className={classes.Toolbar}>
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)}>
            Конструктор
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? classes.active : undefined)}>
            Меню
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Toolbar;