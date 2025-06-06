import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import { INGREDIENTS, BASE_BURGER_PRICE } from '../constants';
import Layout from '../components/Layout/Layout';
import BurgerNameInput from '../components/BurgerNameInput/BurgerNameInput';
import { database } from '../firebase';
import { ref, push, get, update } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom';

const calculateTotalPrice = (currentIngredients) => {
  let price = BASE_BURGER_PRICE;
  for (const ingredient of INGREDIENTS) {
    price += currentIngredients[ingredient.type] * ingredient.price;
  }
  return price;
};

const BurgerBuilder = () => {
  const { burgerId } = useParams();
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const [totalPrice, setTotalPrice] = useState(BASE_BURGER_PRICE);
  const [purchasable, setPurchasable] = useState(false);
  const [burgerName, setBurgerName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (burgerId) {
      setLoading(true);
      const burgerRef = ref(database, `burgers/${burgerId}`);
      get(burgerRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setIngredients(data.ingredients || { salad: 0, bacon: 0, cheese: 0, meat: 0 });
          setBurgerName(data.name || '');
        } else {
          console.log("No data available for this burger ID");
          navigate('/');
        }
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching burger for edit:", error);
        setLoading(false);
        navigate('/');
      });
    }
  }, [burgerId, navigate, database]);

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

  const saveBurgerHandler = async () => {
    const burgerData = {
      ingredients: ingredients,
      price: totalPrice,
      name: burgerName.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      if (burgerId) {
        const updates = {};
        updates[`/burgers/${burgerId}`] = burgerData;
        await update(ref(database), updates);
        alert('Бургер успешно обновлен!');
      } else {
        const burgersRef = ref(database, 'burgers');
        await push(burgersRef, burgerData);
        alert('Бургер добавлен в меню!');
      }
      setIngredients({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      });
      setBurgerName('');
      navigate('/menu');
    } catch (error) {
      alert('Ошибка: ' + error.message);
      console.error(error);
    }
  };

  const disabledInfo = { ...ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  if (loading) {
    return (
      <Layout>
        <p>Загрузка бургера для редактирования...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Burger ingredients={ingredients} />

      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabledInfo={disabledInfo}
        price={totalPrice}
        purchasable={purchasable}
        orderNow={saveBurgerHandler}
        orderButtonText={burgerId ? "ОБНОВИТЬ БУРГЕР" : "ДОБАВИТЬ В МЕНЮ"}
      />
      <BurgerNameInput
        burgerName={burgerName}
        onNameChange={handleNameChange}
      />
    </Layout>
  );
};

export default BurgerBuilder;