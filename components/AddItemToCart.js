import React from 'react';
import styled from 'styled-components';
import NumberIncrementor from './NumberIncrementor';

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
    position: absolute;
    right: 1rem;
    top: 6px;
    border: 2px solid rgb(217, 217, 217);
    padding: 0.5rem;
  }
`;

const AddItemToCart = ({ quantity, setQuantity }) => {
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
        <span className="total_price">$$$</span>
      </button>
    </StyledAddItemToCart>
  );
};

export default AddItemToCart;
