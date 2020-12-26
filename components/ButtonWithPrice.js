import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledButton = styled.button`
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
  transition: background-color 0.4s ease, color 0.4s ease;

  &:hover {
    background-color: #5794ff;
    color: white;
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
    transition: transform 0.5s;
    transform: translateY(200%);

    display: block;

    &.total_amount-enter-active {
      transform: translateY(0);
    }
  }

  .total_amount-exit {
    display: block;
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

const ButtonWithPrice = (props) => {
  return (
    <StyledButton onClick={props.handleClick}>
      <span>Add to Cart</span>
      <TransitionGroup component="span" className="total_price">
        <CSSTransition
          classNames="total_amount"
          key={props.calcTotalPriceInCents(props.price) ?? props.price}
          timeout={{ enter: 500, exit: 500 }}
        >
          <span>{props.displayTotalPrice(props.price)}</span>
        </CSSTransition>
      </TransitionGroup>
    </StyledButton>
  );
};

export default ButtonWithPrice;
