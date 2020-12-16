import React from 'react';
import { useRouter } from 'next/router';

const itemDisplay = () => {
  const router = useRouter();
  const { itemID } = router.query;
  return <div>Here's your item! {itemID}</div>;
};

export default itemDisplay;
