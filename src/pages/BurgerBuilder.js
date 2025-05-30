import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import { INGREDIENTS, BASE_BURGER_PRICE } from '../constants';
import Layout from '../components/Layout/Layout';
// import Modal from '../components/UI/Modal/Modal'; // ЭТА СТРОКА УБРАНА

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
  // const [purchasing, setPurchasing] = useState(false); // ЭТО СОСТОЯНИЕ УБРАНО

  useEffect(() => {
    const updatedPrice = calculateTotalPrice(ingredients);
    setTotalPrice(updatedPrice);
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);
    setPurchasable(sum > 0);
  }, [ingredients]);

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

  // const purchaseHandler = () => { setPurchasing(true); }; // ЭТА ФУНКЦИЯ УБРАНА
  // const purchaseCancelHandler = () => { setPurchasing(false); }; // ЭТА ФУНКЦИЯ УБРАНА

  // Новая, простая функция, которая ничего не делает, пока не будет модального окна
  const purchaseHandler = () => {
    alert('Оформить заказ!'); // Простое сообщение
  };


  const disabledInfo = { ...ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Layout>
      {/* <Modal show={purchasing} modalClosed={purchaseCancelHandler}> */}
        {/* Здесь был код модального окна, теперь его нет */}
      {/* </Modal> */}

      <Burger ingredients={ingredients} />

      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabledInfo={disabledInfo}
        price={totalPrice}
        purchasable={purchasable}
        orderNow={purchaseHandler}
      />
    </Layout>
  );
};

export default BurgerBuilder;