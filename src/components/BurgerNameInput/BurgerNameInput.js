import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerNameInput.module.css';

const BurgerNameInput = ({ burgerName, onNameChange }) => (
  <div className={classes.BurgerNameInput}>
    <label htmlFor="burgerName">Название бургера:</label>
    <input
      type="text"
      id="burgerName"
      value={burgerName}
      onChange={onNameChange}
      placeholder="Введите название бургера"
    />
  </div>
);

BurgerNameInput.propTypes = {
  burgerName: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
};

export default BurgerNameInput;