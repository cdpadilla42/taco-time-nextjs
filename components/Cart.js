import React from 'react';
import styled from 'styled-components';
import ButtonWithPrice from '../components/ButtonWithPrice';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../lib/redux';

const StyledCart = styled.div`
  height: 100vh;
  transform: translateX(0);
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &.closed {
    transform: translateX(100%);
  }

  .heading {
    padding: 1rem;
    display: flex;
    width: calc(100% - 2rem);
    border-bottom: 2px solid rgb(217, 217, 217);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
    align-items: center;

    h4 {
      margin: 0;
      padding: 0;
      flex: 1;
    }

    button {
      border: none;
      background-color: rgba(0, 0, 0, 0);
      cursor: pointer;
      font-size: 2rem;
      transform: translateY(-4px);
    }
  }

  .items_display {
    overflow: scroll;
    flex: 1;
  }

  .item_row {
    padding: 1rem;
    display: flex;
    border-top: 1px solid rgb(217, 217, 217);

    &:first-child {
      border-top: none;
    }

    .left {
      flex: 1;
    }

    .right {
      display: flex;
    }
  }

  .item_customizations {
    color: rgb(100, 100, 100);
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 0.8rem;

    li {
      margin: 0.5rem 0;
    }
  }

  .price {
    display: block;
    padding: 0 1rem;
  }

  .remove {
    box-sizing: border-box;
    background-color: black;
    color: white;
    border: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .total_bottom_line {
    background-color: rgb(242, 242, 242);
    border-top: 1px solid rgb(217, 217, 217);
    padding: 1rem 0;
  }

  .quantity_row {
    display: flex;
    margin: 1rem 1rem;
    align-items: center;

    .quantity_text {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state);
  console.log(isCartOpen);

  function handleClose() {
    dispatch(toggleCart());
  }
  return (
    <StyledCart className={isCartOpen && 'closed'}>
      <div className="heading">
        <h4>Your Order</h4>
        <button onClick={handleClose}>&times;</button>
      </div>
      <div className="items_display">
        <div className="item_row">
          <div className="left">
            <div className="item_details">1 Fundido Sirloin</div>
            <ul className="item_customizations">
              <li>Flour</li>
              <li>No Cheese</li>
              <li>Extra Yummy</li>
            </ul>
          </div>
          <div className="right">
            <span className="price">$4.50</span>
            <button className="remove">
              <span>&times;</span>
            </button>
          </div>
        </div>
        <div className="item_row">
          <div className="left">
            <div className="item_details">1 Fundido Sirloin</div>
            <ul className="item_customizations">
              <li>Flour</li>
              <li>No Cheese</li>
              <li>Extra Yummy</li>
            </ul>
          </div>
          <div className="right">
            <span className="price">$4.50</span>
            <button className="remove">
              <span>&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div className="total_bottom_line">
        <div className="quantity_row">
          <span className="quantity_text">Sub Total</span>
          <div className="quantity_row__right">$8.20</div>
        </div>
        <div className="quantity_row">
          <span className="quantity_text">Estimated Tax</span>
          <div className="quantity_row__right">$8.20</div>
        </div>
        <ButtonWithPrice />
      </div>
    </StyledCart>
  );
};

export default Cart;
