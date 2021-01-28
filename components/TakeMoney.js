import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const TakeMoney = ({ children, price, image, cartSize }) => {
  function renderDescription() {
    if (cartSize === 1) {
      return `Your order of ${cartSize} item`;
    } else {
      return `Your order of ${cartSize} items`;
    }
  }

  return (
    <StripeCheckout
      name="¡Taco Time!"
      description={renderDescription()}
      image={image}
      amount={price}
      currency="USD"
      stripeKey="pk_test_51IEN1HAZuIcIZEmnjHARBRUX7p8lcNCfaYU39iGFKAqUhrsJSnGCtPCgi6NFaI32g2fdMtQ6Lg1UTk16oC35KjhA00xgo59eJ7"
    >
      {children}
    </StripeCheckout>
  );
};

export default TakeMoney;
