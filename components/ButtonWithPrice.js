import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { displayTotalPrice } from '../lib/utility';

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

  &.verified:hover {
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

  .message {
    @media (max-width: 600px) {
      text-align: left;
      display: block;
    }
  }

  &.error {
    background-color: rgb(239, 51, 64, 0.5);
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

const ButtonWithPrice = ({
  price,
  handleClick,
  message,
  submissionVerified = true,
}) => {
  const [errorActive, setErrorActive] = useState(false);

  function buttonClick(e) {
    const button = e.currentTarget;
    if (submissionVerified) {
      handleClick();
    } else {
      if (window !== undefined) {
        button.classList.add('error');
        setErrorActive(true);
        setTimeout(() => {
          button.classList.remove('error');
          setErrorActive(false);
        }, 5000);
      }
    }
  }
  return (
    <StyledButton
      onClick={buttonClick}
      className={
        submissionVerified ? 'verified submit_button' : 'submit_button'
      }
      data-testid="add-item"
      title={message}
    >
      <span className="message">
        {errorActive ? 'Please select required options' : message}
      </span>
      <TransitionGroup component="span" className="total_price">
        <CSSTransition
          classNames="total_amount"
          key={price}
          timeout={{ enter: 500, exit: 500 }}
        >
          <span>{displayTotalPrice(price)}</span>
        </CSSTransition>
      </TransitionGroup>
    </StyledButton>
  );
};

export default ButtonWithPrice;
