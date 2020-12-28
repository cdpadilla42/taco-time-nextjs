import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../lib/redux';
import { priceToString } from '../lib/utility';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  function handleItemRemoval(cartItemId) {
    console.log(`Removing ${cartItemId}`);
    dispatch(removeFromCart(cartItemId));
  }

  function renderCusomizations() {
    return (
      <ul className="item_customizations">
        {Object.values(item.selectedOptions).map((customization) => (
          <li key={`${item.cartItemId}${customization}`}>{customization}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {/* ------------------------------------- */}
      {/* TODO Try extracting this outside of the mapping function */}
      {/* ------------------------------------------ */}

      <CSSTransition
        classNames="row_transition"
        key={item.cartItemId}
        timeout={{ enter: 5000, exit: 5000 }}
      >
        <div className="item_row">
          <div className="left">
            <div className="item_details">{`${item.quantity} ${item.name}`}</div>
            {renderCusomizations()}
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
      </CSSTransition>
    </>
  );
};

export default CartItem;
