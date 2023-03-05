import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAction } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';

let store;

const initialState = {
  cart: [],
  isCartOpen: false,
  toastMessage: '',
};

// Actions
export const editCartItem = createAction('EDIT_CART_ITEM');
export const closeCart = createAction('CLOSE_CART');
export const toggleCart = createAction('TOGGLE_CART');
export const removeFromCart = createAction('REMOVE_FROM_CART');
export const clearCart = createAction('CLEAR_CART');
export const clearToast = createAction('CLEAR_TOAST');

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const cart = state.cart;
      cart.push(action.payload);
      const toastMessage = `Added ${action.payload.name} to Cart`;
      return { ...state, cart, toastMessage };
    }
    case editCartItem.toString(): {
      const { cartItemId } = action.payload;
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.cartItemId === cartItemId
      );
      const newCart = [...state.cart];
      newCart[itemIndex] = action.payload;
      const toastMessage = `Updated ${action.payload.name}`;
      return { ...state, cart: newCart, toastMessage };
    }
    case clearToast.toString(): {
      const toastMessage = '';
      return { ...state, toastMessage };
    }
    case removeFromCart.toString(): {
      const cart = state.cart.filter(
        (item) => item.cartItemId !== action.payload
      );
      return { ...state, cart };
    }
    case clearCart.toString(): {
      return { ...state, cart: [] };
    }
    case toggleCart.toString(): {
      return { ...state, isCartOpen: !state.isCartOpen };
    }
    case closeCart.toString(): {
      return { ...state, isCartOpen: false };
    }
    default:
      return state;
  }
};

export function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

const persistedState = loadState();

store = initStore(persistedState);

store.subscribe(() => {
  saveState({ ...store.getState() });
});

export default store;
