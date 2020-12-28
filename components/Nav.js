import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../lib/redux';
import styled from 'styled-components';
import wait from 'waait';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  .logo {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .home,
  button {
    flex-basis: 3rem;
  }

  .toast {
    position: absolute;
    right: 0.5rem;
    top: 2.25rem;
    background-color: #2c7d3d;
    color: #fffbfa;
    padding: 0.6rem;
    border-radius: 5px;
  }

  .toaster-enter {
    transform: translateY(-20%);
    transition: transform 0.5s, color 0.5s, background-color 0.5s;
    background-color: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
    &.toaster-enter-active {
      transform: translateY(0);
      background-color: #2c7d3d;
      color: #fffbfa;
    }
  }

  .toaster-exit {
    transform: translateY(0);
    transition: transform 0.5s, color 0.5s, background-color 0.5s;
    transform: translateY(0);
    background-color: #2c7d3d;
    color: #fffbfa;
    &.toaster-exit-active {
      transform: translateY(-20%);
      background-color: rgba(0, 0, 0, 0);
      color: rgba(0, 0, 0, 0);
    }
  }
`;

const Nav = () => {
  const dispatch = useDispatch();
  const [isToastShowing, setIsToastShowing] = useState(false);
  const toastMessage = useSelector((state) => state.toastMessage);

  useEffect(() => {
    if (toastMessage === '') return;
    showToast(toastMessage);
  }, [toastMessage]);

  function handleClick() {
    dispatch(toggleCart());
  }

  async function showToast(message) {
    // setToastMessage(message);
    console.log('toast on');
    setIsToastShowing(true);
    await wait(4000);
    console.log('bye toast');
    setIsToastShowing(false);
  }

  return (
    <StyledNav>
      <div className="home">House</div>
      <div className="logo">Taco Time!</div>
      <button onClick={() => showToast('Yum!')}>Toast</button>
      <button onClick={handleClick}>Cart</button>
      <TransitionGroup component="div">
        {isToastShowing && (
          <CSSTransition
            classNames="toaster"
            key="toaster"
            timeout={{ enter: 500, exit: 500 }}
          >
            <div className="toast">{toastMessage}</div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </StyledNav>
  );
};

export default Nav;
