import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout/Layout';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import classes from './Menu.module.css';
import Burger from '../components/Burger/Burger';
import PropTypes from 'prop-types';

const Menu = () => {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const burgersRef = ref(database, 'burgers');
    const unsubscribe = onValue(burgersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const loadedBurgers = [];
        for (let key in data) {
          loadedBurgers.push({
            id: key,
            ...data[key]
          });
        }
        setBurgers(loadedBurgers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => {
      unsubscribe(); // Отписываемся от слушателя при размонтировании компонента
    };
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className={classes.Loading}>Загрузка меню...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className={classes.Error}>Ошибка загрузки меню: {error}</p>
      </Layout>
    );
  }

  if (burgers.length === 0) {
    return (
      <Layout>
        <p className={classes.NoBurgers}>В меню пока нет бургеров. Создайте свой первый бургер!</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.Menu}>
        <h1>Наше Бургерное Меню</h1>
        {burgers.map(burger => (
          <div key={burger.id} className={classes.MenuItem}>
            <h2>{burger.name}</h2>
            <Burger ingredients={burger.ingredients} />
            <p className={classes.Price}>Цена: <strong>{burger.price.toFixed(2)} сомов</strong></p>
            {}
          </div>
        ))}
      </div>
    </Layout>
  );
};


Menu.propTypes = {
};

export default Menu;