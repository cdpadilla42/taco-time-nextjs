import React, { useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!, $cart: CartInput!) {
    createOrder(token: $token, cart: $cart) {
      id
      total
      charge
      items {
        id
        name
      }
    }
  }
`;

const TakeMoney = ({ children, price, image, cartSize }) => {
  const [createOrder, { data }] = useMutation(CREATE_ORDER_MUTATION);
  const cart = useSelector((store) => store.cart);

  function renderDescription() {
    if (cartSize === 1) {
      return `Your order of ${cartSize} item`;
    } else {
      return `Your order of ${cartSize} items`;
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  async function onToken(res) {
    NProgress.start();
    console.log('On Token');
    console.log(res.id);
    createOrder({
      variables: {
        token: res.id,
        // Insert into CartInput an object with the key of cart and that property of the cart from redux
        cart: { cart: cart },
      },
    }).catch((err) => console.error(err));
    NProgress.done();
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
