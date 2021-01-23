import React, { useEffect } from 'react';
import styled from 'styled-components';
import ButtonWithPrice from '../components/ButtonWithPrice';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { toggleCart, removeFromCart } from '../lib/redux';
import CartItem from './CartItem';
import { priceToString } from '../lib/utility';

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
  z-index: 3;

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

  .empty_cart_prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
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

  .row_transition-exit {
    transition: transform 0.2s;
    transform: translateX(0);

    &.row_transition-exit-active {
      transform: translateX(100%);
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
      text-transform: capitalize;
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
  const { isCartOpen, cart: cartItems } = useSelector((state) => state);
  const message = 'Checkout';
  const router = useRouter();

  useEffect(() => {
    console.log('getting cart info from local storage');
  }, []);

  console.log('cartItems', cartItems);

  function handleClose() {
    dispatch(toggleCart());
  }

  function calcCartPreTaxTotal() {
    return cartItems.reduce((prev, current) => {
      return prev + current.price * current.quantity;
    }, 0);
  }

  function calcCartTax() {
    return 0.025 * calcCartPreTaxTotal();
  }

  function calcCartTotalWithTax() {
    return calcCartPreTaxTotal() + calcCartTax();
  }

  function goToCheckout() {
    router.push('/checkout');
    handleClose();
  }

  function renderEmptyCart() {
    if (window === undefined) return;
    return <div className="empty_cart_prompt">No items in the cart!</div>;
  }

  return (
    <StyledCart className={!isCartOpen && 'closed'}>
      {/* Keep cart from populating without persistedState from local storage on the server */}
      <div className="heading">
        <h4>Your Order</h4>
        <button onClick={handleClose}>&times;</button>
      </div>
      {cartItems.length !== 0 ? (
        <TransitionGroup component="div" className="items_display">
          {cartItems.map((item) => (
            <CSSTransition
              classNames="row_transition"
              key={item.cartItemId}
              timeout={{ exit: 200 }}
            >
              <CartItem
                item={item}
                key={item.cartItemId}
                handleClose={handleClose}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        // TODO: Pull me out into a render function that checks if window, and returns nothing if no window
        <div className="items_display">{renderEmptyCart()}</div>
      )}
      {cartItems.length !== 0 && (
        <>
          <div className="total_bottom_line">
            <div className="quantity_row">
              <span className="quantity_text">Sub Total</span>
              <div className="quantity_row__right">
                {priceToString(calcCartPreTaxTotal())}
              </div>
            </div>
            <div className="quantity_row">
              <span className="quantity_text">Estimated Tax</span>
              <div className="quantity_row__right">
                {priceToString(calcCartTax())}
              </div>
            </div>
            <ButtonWithPrice
              price={calcCartTotalWithTax()}
              message={message}
              handleClick={goToCheckout}
            />
          </div>
        </>
      )}
    </StyledCart>
  );
};

export default Cart;
