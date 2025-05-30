import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BurgerBuilder from './pages/BurgerBuilder';
import BurgersMenu from './pages/BurgersMenu'; // Новая страница
import './App.css';
import classes from './App.module.css'; // Для стилей навигации

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className={classes.Navbar}>
          <ul className={classes.NavList}>
            <li className={classes.NavItem}>
              <Link to="/" className={classes.NavLink}>Конструктор</Link>
            </li>
            <li className={classes.NavItem}>
              <Link to="/menu" className={classes.NavLink}>Меню</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/menu" element={<BurgersMenu />} />
          {/* Роут для редактирования добавим позже */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;