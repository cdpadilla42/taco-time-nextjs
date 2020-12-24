import React from 'react';
import styled from 'styled-components';

const StyledNumberIncrementor = styled.div`
  display: flex;

  button {
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
  }

  .plus,
  .minus,
  .value {
    margin: 0;
    padding: 0;
    border: 1px solid rgb(217, 217, 217);
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .value {
      background-color: #fff;
    }

    span {
      text-align: center;
    }
  }
`;

const NumberIncrementor = ({ quantity, setQuantity }) => {
  function increment() {
    setQuantity((prevState) => prevState + 1);
  }

  function decrement() {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
  }

  return (
    <StyledNumberIncrementor>
      <button className="minus" onClick={decrement}>
        <span>-</span>
      </button>
      <div className="value">
        <span>{quantity}</span>
      </div>
      <button className="plus" onClick={increment}>
        <span>+</span>
      </button>
    </StyledNumberIncrementor>
  );
};

export default NumberIncrementor;
