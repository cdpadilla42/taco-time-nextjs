import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NumberIncrementor from './NumberIncrementor';
import ButtonWithPrice from './ButtonWithPrice';
import { calcTotalPriceInCents } from '../lib/utility';

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
`;

const AddItemToCart = ({
  quantity,
  setQuantity,
  price,
  submissionVerified,
  onSubmit,
  isCartItem,
}) => {
  const message = isCartItem ? 'Save Order Changes' : 'Add Item to Cart';

  return (
    <StyledAddItemToCart>
      <div className="quantity_row">
        <span className="quantity_text">Quantity</span>
        <div className="quantity_row__input">
          <NumberIncrementor quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
      <ButtonWithPrice
        price={calcTotalPriceInCents(price, quantity)}
        handleClick={onSubmit}
        message={message}
        submissionVerified={submissionVerified}
      />
    </StyledAddItemToCart>
  );
};

export default AddItemToCart;
