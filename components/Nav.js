import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../lib/redux';

const Nav = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleCart());
  }
  return (
    <div>
      <button onClick={handleClick} style={{ position: 'absolute', right: 0 }}>
        Cart
      </button>
    </div>
  );
};

export default Nav;
