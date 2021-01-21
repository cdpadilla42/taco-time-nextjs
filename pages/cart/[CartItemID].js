import React from 'react';
import { useRouter } from 'next/router';
import CartItemForm from '../../components/CartItemForm';

const EditCartItem = () => {
  const router = useRouter();
  const { CartItemID } = router.query;
  console.log({ CartItemID });
  return <p>{CartItemID}</p>;
  // return <CartItemForm />;
};

export default EditCartItem;
