import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAction } from '@reduxjs/toolkit';

let store;

const initialState = {
  cart: [],
  isCartOpen: false,
  toastMessage: '',
};

// Actions
export const toggleCart = createAction('TOGGLE_CART');
export const removeFromCart = createAction('REMOVE_FROM_CART');
export const clearToast = createAction('CLEAR_TOAST');

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const cart = state.cart;
      cart.push(action.payload);
      const toastMessage = `Added ${action.payload.name} to cart`;
      return { ...state, cart, toastMessage };
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
    case toggleCart.toString(): {
      return { ...state, isCartOpen: !state.isCartOpen };
    }
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

store = initStore();

export default store;

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
