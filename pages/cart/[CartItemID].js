import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CartItemForm from '../../components/CartItemForm';

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

  const {
    data: { itemById: item },
  } = useQuery(ItemByIdQuery, {
    variables: {
      id: cartItem.id,
    },
  });

  console.log(item);

  return <CartItemForm itemID={cartItem?.id} item={item} cartItem={cartItem} />;
};

export default EditCartItem;
