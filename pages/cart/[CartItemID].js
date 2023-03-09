import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CartItemForm from '../../components/CartItemForm';
import Loading from '../../components/Loading';
import FourOhFour from '../../components/404';
import { editCartItem } from '../../lib/redux';

const ItemByIdQuery = gql`
  query getItem($id: ID!) {
    itemById(id: $id) {
      name
      description
      price
      img
      customizations {
        name
        title
        required
        selectMultiple
        options {
          name
          price
        }
      }
    }
  }
`;

const CartItemPage = () => {
  const dispatch = useDispatch();
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const router = useRouter();
  const { CartItemID } = router.query;

  const selectCartItem = createSelector(
    (state) => state.cart,
    (cartItems) =>
      cartItems.find((cartItem) => cartItem.cartItemId === CartItemID)
  );

  console.log(CartItemID);

  const cartItem = useSelector(selectCartItem) || { id: 0 };

  const { data, loading, error } = useQuery(ItemByIdQuery, {
    variables: {
      id: cartItem?.id,
    },
  });
  console.log(cartItem);
  if (cartItem.id === 0) return <FourOhFour />;
  if (!isClient || cartItem.id === 0) return null;
  if (loading) return <Loading />;
  if (error) return <FourOhFour />;

  const item = data.itemById;

  console.log(item);

  const handleSubmit = (values) => {
    console.log({ values });
    dispatch({
      type: editCartItem.toString(),
      payload: {
        ...values,
        cartItemId: cartItem?.cartItemId,
      },
    });

    router.push('/');
  };

  return (
    <CartItemForm
      itemID={cartItem?.id}
      item={item}
      cartItem={cartItem}
      onSubmit={handleSubmit}
    />
  );
};

CartItemPage.getInitialProps = async (ctx) => {
  return {};
};

export default CartItemPage;
