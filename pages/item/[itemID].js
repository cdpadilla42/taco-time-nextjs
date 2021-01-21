import React from 'react';
import connectDb from '../../lib/mongoose';
import { initializeApollo } from '../../apollo/client';
import { useRouter } from 'next/router';
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

const itemDisplay = () => {
  const router = useRouter();
  const { itemID } = router.query;

  const {
    data: { itemById: item },
  } = useQuery(ItemByIdQuery, {
    variables: {
      id: itemID,
    },
  });

  return <CartItemForm item={item} />;
};

export async function getServerSideProps({ params }) {
  await connectDb()();

  const apolloClient = initializeApollo();

  const variables = {
    id: params.itemID,
  };

  await apolloClient.query({
    query: ItemByIdQuery,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default itemDisplay;
