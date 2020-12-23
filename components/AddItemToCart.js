import React from 'react';
import styled from 'styled-components';

const StyledAddItemToCart = styled.div`
  .quantity_row {
    display: flex;
    background-color: rgba(0, 0, 0, 0.8);
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    position: sticky;
    span {
      flex: 1;
    }
  }
`;

const AddItemToCart = () => {
  return (
    <StyledAddItemToCart>
      <div className="quantity_row">
        <span>Quantity</span>
        <div className="quantity_row__input">buttons here</div>
      </div>
      <button>
        <span>Add to Cart</span>
        <span>$$$</span>
      </button>
    </StyledAddItemToCart>
  );
};

export default AddItemToCart;
