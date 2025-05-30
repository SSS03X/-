import React from 'react';
import './App.css';
import BurgerBuilder from './pages/BurgerBuilder';
import Menu from './pages/Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/edit-burger/:burgerId" element={<BurgerBuilder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;