import React from 'react';
import styled from 'styled-components';
import NumberIncrementor from './NumberIncrementor';
import { priceToString } from '../lib/utility';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const StyledAddItemToCart = styled.div`
  position: sticky;
  bottom: 1px;
  background-color: rgb(242, 242, 242);
  border-top: 1px solid rgb(217, 217, 217);
  padding: 1rem 0;

  .quantity_row {
    display: flex;
    margin: 1rem;
    padding: 0.5rem 0;
    margin-top: 0;

    .quantity_text {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }

  .add_to_cart_button {
    box-sizing: border-box;
    margin: 1rem;
    margin-bottom: 0;
    width: calc(100% - 2rem);
    padding: 1rem;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
    display: block;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    position: relative;
  }

  .total_price {
    width: 4rem;
    text-align: center;
    display: block;
    position: absolute;
    right: 1rem;
    top: 6px;
    border: 2px solid rgb(217, 217, 217);
    padding: 0.5rem;
    overflow: hidden;
  }

  .total_amount-enter {
    background-color: red;
    transition: transform 0.5s;
    transform: translateY(200%);

    display: block;

    &.total_amount-enter-active {
      transform: translateY(0);
    }
  }

  .total_amount-exit {
    display: block;
    background-color: yellow;
    transition: transform 0.5s;
    transform: translateY(0);
    position: absolute;
    top: 8px;
    left: 0;
    width: 5rem;
    text-align: center;

    &.total_amount-exit-active {
      transform: translateY(-200%);
    }
  }
`;

const AddItemToCart = ({ quantity, setQuantity, price }) => {
  function displayTotalPrice(price) {
    return priceToString(price * quantity);
  }

  function calcTotalPriceInCents(price) {
    return price * quantity;
  }

  return (
    <StyledAddItemToCart>
      <div className="quantity_row">
        <span className="quantity_text">Quantity</span>
        <div className="quantity_row__input">
          <NumberIncrementor quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
      <button className="add_to_cart_button">
        <span>Add to Cart</span>
        <TransitionGroup component="span" className="total_price">
          <CSSTransition
            classNames="total_amount"
            key={calcTotalPriceInCents(price)}
            timeout={{ enter: 500, exit: 500 }}
          >
            <span>{displayTotalPrice(price)}</span>
          </CSSTransition>
        </TransitionGroup>
      </button>
    </StyledAddItemToCart>
  );
};

export default AddItemToCart;
