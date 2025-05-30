import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl';
import { INGREDIENTS } from '../../constants';

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabledInfo,
  price,
  purchasable,
  orderNow,
  orderButtonText,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Текущая цена: <strong>{price.toFixed(2)} сомов</strong>
      </p>

      {INGREDIENTS.map(ctrl => (
        <BuildControl
          key={ctrl.id}
          label={ctrl.name}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabledInfo[ctrl.type]}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!purchasable}
        onClick={orderNow}
      >
        {orderButtonText}
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabledInfo: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  orderNow: PropTypes.func.isRequired,
  orderButtonText: PropTypes.string,
};

export default BuildControls;