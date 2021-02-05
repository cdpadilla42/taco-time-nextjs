import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Loading from '../../components/Loading';
import FourOhFour from '../../components/404';

const GET_ORDER = gql`
  query orderById($id: ID!) {
    orderById(id: $id) {
      _id
      items {
        name
        description
        price
        quantity
      }
      total
      charge
    }
  }
`;

const OrderPage = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: {
      id: router.query.id,
    },
  });
  console.log(data);

  if (loading) return <Loading />;
  if (error) return <FourOhFour />;
  return <div>Here is your order!</div>;
};

export default OrderPage;
