import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import classes from './BurgersMenu.module.css';

const BurgersMenu = () => {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const burgersRef = ref(database, 'burgers');

    const unsubscribe = onValue(burgersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const loadedBurgers = [];
        for (let key in data) {
          loadedBurgers.push({
            id: key,
            ...data[key],
          });
        }
        setBurgers(loadedBurgers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching burgers:", err);
        setError("Не удалось загрузить бургеры. Попробуйте позже.");
        setLoading(false);
      }
    }, (err) => {
      console.error("Firebase onValue error:", err);
      setError("Проблема с подключением к базе данных.");
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let content = <p>Загрузка бургеров...</p>;
  if (error) {
    content = <p className={classes.ErrorMessage}>{error}</p>;
  } else if (!loading && burgers.length === 0) {
    content = <p>В меню пока нет бургеров.</p>;
  } else if (!loading) {
    content = (
      <div className={classes.BurgerList}>
        {burgers.map((burger) => (
          <div key={burger.id} className={classes.BurgerItem}>
            <h3>{burger.name}</h3>
            <p>Цена: {burger.price.toFixed(2)} сомов</p>
            <p>Ингредиенты:</p>
            <ul className={classes.IngredientsList}>
              {Object.keys(burger.ingredients).map((ingKey) =>
                burger.ingredients[ingKey] > 0 ? (
                  <li key={ingKey}>
                    {ingKey}: {burger.ingredients[ingKey]}
                  </li>
                ) : null
              )}
            </ul>
            {/* Кнопки редактирования и удаления будут добавлены позже */}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Layout>
      <h2>Наше Меню</h2>
      {content}
    </Layout>
  );
};

export default BurgersMenu;