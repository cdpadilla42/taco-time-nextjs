import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import NumberIncrementor from './NumberIncrementor';
import { priceToString } from '../lib/utility';
import ButtonWithPrice from './ButtonWithPrice';

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
  itemID,
  selectedOptions,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  function handleAddToCartClick() {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: itemID,
        quantity,
        selectedOptions,
      },
    });
    router.push('/');
  }

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
      <ButtonWithPrice
        displayTotalPrice={displayTotalPrice}
        calcTotalPriceInCents={calcTotalPriceInCents}
        price={price}
        handleClick={handleAddToCartClick}
      />
    </StyledAddItemToCart>
  );
};

export default AddItemToCart;
