import React from 'react';
import { useRouter } from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';
import { useDispatch } from 'react-redux';
import { clearCart, closeCart } from '../lib/redux';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!, $cart: CartInput!) {
    createOrder(token: $token, cart: $cart) {
      _id
      total
      charge
      items {
        _id
        name
      }
    }
  }
`;

const TakeMoney = ({ children, price, image, cartSize }) => {
  const [createOrder, { data }] = useMutation(CREATE_ORDER_MUTATION);
  const cart = useSelector((store) => store.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  function renderDescription() {
    if (cartSize === 1) {
      return `Your order of ${cartSize} item`;
    } else {
      return `Your order of ${cartSize} items`;
    }
  }

  // useEffect(() => {
  //   console.log(data);
  //   if (!data) return;
  //   if (data.createOrder.id) {
  //   }
  // }, [data]);

  async function onToken(res) {
    NProgress.start();
    console.log('On Token');
    console.log(res.id);
    const result = await createOrder({
      variables: {
        token: res.id,
        // Insert into CartInput an object with the key of cart and that property of the cart from redux
        cart: { cart: cart },
      },
    }).catch((err) => console.error(err));
    // push url to result's id
    console.log(result);
    router.push({
      pathname: '/order/[id]',
      query: { id: result.data.createOrder._id },
    });
    // TODO clear cart & close
    dispatch(clearCart());
    dispatch(closeCart());

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
