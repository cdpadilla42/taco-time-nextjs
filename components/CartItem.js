import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../lib/redux';
import { priceToString } from '../lib/utility';

const CartItem = ({ item, handleClose }) => {
  const dispatch = useDispatch();

  function handleItemRemoval(cartItemId) {
    console.log(`Removing ${cartItemId}`);
    dispatch(removeFromCart(cartItemId));
  }

  function calcItemTotal() {
    return item.quantity * item.price;
  }

  function renderCusomizations() {
    return (
      <ul className="item_customizations">
        {Object.values(item.selectedOptions).map((customization) => {
          if (typeof customization === 'string') {
            return (
              <li
                key={`${item.cartItemId}${customization}`}
                data-testid="cart-item-customization"
              >
                {customization}
              </li>
            );
          } else {
            return customization.map((customizationItem) => (
              <li
                key={`${item.cartItemId}${customizationItem}`}
                data-testid="cart-item-customization"
              >
                {customizationItem}
              </li>
            ));
          }
        })}
      </ul>
    );
  }

  console.log(item);

  return (
    <div className="item_row" data-testid="cart-item-row">
      <div className="left">
        <div className="item_details">
          <Link href={`/cart/${item.cartItemId}`}>
            <a
              onClick={handleClose}
              data-testid="cart-item-title"
            >{`${item.quantity} ${item.name}`}</a>
          </Link>
        </div>
        {renderCusomizations()}
      </div>
      <div className="right">
        <span className="price">{priceToString(calcItemTotal())}</span>
        <button className="remove">
          <span onClick={() => handleItemRemoval(item.cartItemId)}>
            &times;
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
