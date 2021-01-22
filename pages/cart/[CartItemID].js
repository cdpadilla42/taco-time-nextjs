import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import CartItemForm from '../../components/CartItemForm';

const EditCartItem = () => {
  const router = useRouter();
  const { CartItemID } = router.query;
  console.log({ CartItemID });

  const selectCartItem = createSelector(
    (state) => state.cart,
    (cartItems) =>
      cartItems.find((cartItem) => cartItem.cartItemId === CartItemID)
  );

  const cartItem = useSelector(selectCartItem);

  console.log({ cartItem });

  const cart = useSelector((state) => state.cart);
  return <p>{CartItemID}</p>;
  // return <CartItemForm />;
};

export default EditCartItem;
