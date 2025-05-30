import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import { INGREDIENTS, BASE_BURGER_PRICE } from '../constants';
import Layout from '../components/Layout/Layout';
import BurgerNameInput from '../components/BurgerNameInput/BurgerNameInput';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';

const calculateTotalPrice = (currentIngredients) => {
  let price = BASE_BURGER_PRICE;
  for (const ingredient of INGREDIENTS) {
    price += currentIngredients[ingredient.type] * ingredient.price;
  }
  return price;
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const [totalPrice, setTotalPrice] = useState(BASE_BURGER_PRICE);
  const [purchasable, setPurchasable] = useState(false);
  const [burgerName, setBurgerName] = useState('');

  useEffect(() => {
    const updatedPrice = calculateTotalPrice(ingredients);
    setTotalPrice(updatedPrice);
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);
    setPurchasable(sum > 0 && burgerName.trim() !== '');
  }, [ingredients, burgerName]);

  const addIngredientHandler = useCallback((type) => {
    setIngredients((prevIngredients) => {
      const updatedCount = prevIngredients[type] + 1;
      const updatedIngredients = { ...prevIngredients };
      updatedIngredients[type] = updatedCount;
      return updatedIngredients;
    });
  }, []);

  const removeIngredientHandler = useCallback((type) => {
    setIngredients((prevIngredients) => {
      if (prevIngredients[type] <= 0) {
        return prevIngredients;
      }
      const updatedCount = prevIngredients[type] - 1;
      const updatedIngredients = { ...prevIngredients };
      updatedIngredients[type] = updatedCount;
      return updatedIngredients;
    });
  }, []);

  const handleNameChange = useCallback((event) => {
    setBurgerName(event.target.value);
  }, []);

  const addBurgerToMenuHandler = async () => {
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      name: burgerName.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const burgersRef = ref(database, 'burgers');
      await push(burgersRef, order);
      alert('Бургер добавлен в меню!');
      setIngredients({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      });
      setBurgerName('');
    } catch (error) {
      alert('Ошибка при добавлении бургера: ' + error.message);
    }
  };

  const disabledInfo = { ...ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Layout>
      <Burger ingredients={ingredients} />

      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabledInfo={disabledInfo}
        price={totalPrice}
        purchasable={purchasable && burgerName.trim() !== ''}
        orderNow={addBurgerToMenuHandler}
        orderButtonText="ДОБАВИТЬ В МЕНЮ"
      />
      <BurgerNameInput
        burgerName={burgerName}
        onNameChange={handleNameChange}
      />
    </Layout>
  );
};

export default BurgerBuilder;