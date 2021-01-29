import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder($token) {
      id
      total
      charge
      items {
        id
        title
      }
    }
  }
`;

const TakeMoney = ({ children, price, image, cartSize }) => {
  const [createOrder, { data }] = useMutation(CREATE_ORDER_MUTATION);

  function renderDescription() {
    if (cartSize === 1) {
      return `Your order of ${cartSize} item`;
    } else {
      return `Your order of ${cartSize} items`;
    }
  }

  function onToken(res) {
    console.log('On Token');
    console.log(res.id);
    createOrder({
      variables: {
        token: res.id,
      },
    });
  }

  return (
    <StripeCheckout
      name="¡Taco Time!"
      description={renderDescription()}
      image={image}
      amount={price}
      currency="USD"
      stripeKey="pk_test_51IEN1HAZuIcIZEmnjHARBRUX7p8lcNCfaYU39iGFKAqUhrsJSnGCtPCgi6NFaI32g2fdMtQ6Lg1UTk16oC35KjhA00xgo59eJ7"
      token={(res) => onToken(res)}
    >
      {children}
    </StripeCheckout>
  );
};

export default TakeMoney;
