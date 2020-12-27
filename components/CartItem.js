import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../lib/redux';
import { priceToString } from '../lib/utility';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  function handleItemRemoval(cartItemId) {
    console.log(`Removing ${cartItemId}`);
    dispatch(removeFromCart(cartItemId));
  }

  function renderCusomizations(item) {
    return (
      <ul className="item_customizations">
        {Object.values(item.selectedOptions).map((customization) => (
          <li key={`${item.cartItemId}${customization}`}>{customization}</li>
        ))}
      </ul>
    );
  }

  return (
    <React.Fragment key={item.cartItemId}>
      <div className="item_row">
        <div className="left">
          <div className="item_details">{`${item.quantity} ${item.name}`}</div>
          {renderCusomizations(item)}
        </div>
        <div className="right">
          <span className="price">{priceToString(item.price)}</span>
          <button className="remove">
            <span onClick={() => handleItemRemoval(item.cartItemId)}>
              &times;
            </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
