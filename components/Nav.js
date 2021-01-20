import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, clearToast } from '../lib/redux';
import styled from 'styled-components';
import wait from 'waait';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 160 80'%3E%3Cg fill='%23f5f5f5' %3E%3Cpolygon points='0 10 0 0 10 0'/%3E%3Cpolygon points='0 40 0 30 10 30'/%3E%3Cpolygon points='0 30 0 20 10 20'/%3E%3Cpolygon points='0 70 0 60 10 60'/%3E%3Cpolygon points='0 80 0 70 10 70'/%3E%3Cpolygon points='50 80 50 70 60 70'/%3E%3Cpolygon points='10 20 10 10 20 10'/%3E%3Cpolygon points='10 40 10 30 20 30'/%3E%3Cpolygon points='20 10 20 0 30 0'/%3E%3Cpolygon points='10 10 10 0 20 0'/%3E%3Cpolygon points='30 20 30 10 40 10'/%3E%3Cpolygon points='20 20 20 40 40 20'/%3E%3Cpolygon points='40 10 40 0 50 0'/%3E%3Cpolygon points='40 20 40 10 50 10'/%3E%3Cpolygon points='40 40 40 30 50 30'/%3E%3Cpolygon points='30 40 30 30 40 30'/%3E%3Cpolygon points='40 60 40 50 50 50'/%3E%3Cpolygon points='50 30 50 20 60 20'/%3E%3Cpolygon points='40 60 40 80 60 60'/%3E%3Cpolygon points='50 40 50 60 70 40'/%3E%3Cpolygon points='60 0 60 20 80 0'/%3E%3Cpolygon points='70 30 70 20 80 20'/%3E%3Cpolygon points='70 40 70 30 80 30'/%3E%3Cpolygon points='60 60 60 80 80 60'/%3E%3Cpolygon points='80 10 80 0 90 0'/%3E%3Cpolygon points='70 40 70 60 90 40'/%3E%3Cpolygon points='80 60 80 50 90 50'/%3E%3Cpolygon points='60 30 60 20 70 20'/%3E%3Cpolygon points='80 70 80 80 90 80 100 70'/%3E%3Cpolygon points='80 10 80 40 110 10'/%3E%3Cpolygon points='110 40 110 30 120 30'/%3E%3Cpolygon points='90 40 90 70 120 40'/%3E%3Cpolygon points='10 50 10 80 40 50'/%3E%3Cpolygon points='110 60 110 50 120 50'/%3E%3Cpolygon points='100 60 100 80 120 60'/%3E%3Cpolygon points='110 0 110 20 130 0'/%3E%3Cpolygon points='120 30 120 20 130 20'/%3E%3Cpolygon points='130 10 130 0 140 0'/%3E%3Cpolygon points='130 30 130 20 140 20'/%3E%3Cpolygon points='120 40 120 30 130 30'/%3E%3Cpolygon points='130 50 130 40 140 40'/%3E%3Cpolygon points='120 50 120 70 140 50'/%3E%3Cpolygon points='110 70 110 80 130 80 140 70'/%3E%3Cpolygon points='140 10 140 0 150 0'/%3E%3Cpolygon points='140 20 140 10 150 10'/%3E%3Cpolygon points='140 40 140 30 150 30'/%3E%3Cpolygon points='140 50 140 40 150 40'/%3E%3Cpolygon points='140 70 140 60 150 60'/%3E%3Cpolygon points='150 20 150 40 160 30 160 20'/%3E%3Cpolygon points='150 60 150 50 160 50'/%3E%3Cpolygon points='140 70 140 80 150 80 160 70'/%3E%3C/g%3E%3C/svg%3E");
  color: #ef3340;
  font-weight: 700;
  border-top: 3px solid #ef3340;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;

  a {
    text-decoration: none;
    color: inherit;
  }

  .logo {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }

  .logo_text {
    font-family: 'Merienda', cursive;
  }

  .home,
  button {
    flex-basis: 3rem;
  }

  button {
    background-color: #ef3340;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .toast {
    position: absolute;
    right: 0.5rem;
    top: 3.25rem;
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

  async function showToast() {
    console.log('toast on');
    setIsToastShowing(true);
    await wait(4000);
    console.log('bye toast');
    setIsToastShowing(false);
    dispatch(clearToast());
  }

  return (
    <StyledNav>
      <div className="home">
        <Link href="/">
          <a>Menu</a>
        </Link>
      </div>
      <div className="logo">
        <Link href="/">
          <a className="logo_text">¡Taco Time!</a>
        </Link>
      </div>
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
