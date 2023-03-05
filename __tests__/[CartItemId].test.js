/**
 * @jest-environment jsdom
 */
import React from 'react';
import * as reactRedux from 'react-redux';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import styled from 'styled-components';
import CartItemPage from '../pages/cart/[CartItemID]';
import { renderWithProviders } from '../lib/testUtils';
import { initStore } from '../lib/redux';
import Layout from '../components/Layout';

const chipsAndGuac = {
  __typename: 'Item',
  name: 'Guacamole & Chips',
  description: 'Creamy, salty power food',
  price: 200,
  img: '/guacamole-12.jpg',
  customizations: [
    {
      __typename: 'Customization',
      name: 'spice',
      title: 'Choose Spice Level',
      required: true,
      selectMultiple: null,
      options: [
        {
          __typename: 'Option',
          name: 'Mild',
          price: null,
        },
        {
          __typename: 'Option',
          name: 'Medium',
          price: null,
        },
        {
          __typename: 'Option',
          name: 'Seriously Hot',
          price: 100,
        },
      ],
    },
  ],
};

jest.mock('uuid', () => ({
  v4: () => '',
}));

// jest.mock('styled-components', () => {
//   const mock = () => () => jest.fn();
//   mock.div = () => jest.fn();
//   mock.div.withConfig = () => jest.fn();
//   mock.button = () => jest.fn();
//   mock.button.withConfig = () => jest.fn();
//   mock.form = () => jest.fn();
//   mock.form.withConfig = () => jest.fn();
//   return {
//     __esModule: true,
//     default: mock,
//   };
// });

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      query: {
        CartItemID: '5feb9e4a351036315ff4588z',
      },
      push: () => {},
      events: {
        on: () => {},
        off: () => {},
      },
    }),
  };
});

jest.mock('@apollo/client', () => ({
  useQuery: () => ({
    data: { itemById: { ...chipsAndGuac } },
  }),
  useLazyQuery: () => ['', {}],
  useMutation: () => ['', {}],
  gql: () => '',
}));

afterEach(() => {
  cleanup();
});

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);

test('<CartItemPage />', async () => {
  const formExpectedValue = {
    cartItemId: '5feb9e4a351036315ff4588z',
    id: '5feb9e4a351036315ff4588a',
    image: '/guacamole-12.jpg',
    name: 'Guacamole & Chips',
    price: 200,
    quantity: 1,
    selectedOptions: {
      spice: 'Mild',
    },
  };

  const handleSubmit = jest.fn();

  const store = initStore({ cart: [formExpectedValue] });
  // store.dispatch({
  //   type: 'ADD_TO_CART',
  //   payload: {
  //     ...formExpectedValue,
  //   },
  // });

  console.log(store.getState());

  const rendered = renderWithProviders(
    <Layout
      children={
        <CartItemPage
          item={chipsAndGuac}
          itemID={'5feb9e4a351036315ff4588a'}
          onSubmit={handleSubmit}
        />
      }
    />,
    { store }
  );

  const pageTitleElm = await rendered.findByTestId('item-header');

  expect(pageTitleElm.innerHTML).toEqual('Guacamole &amp; Chips');

  const customizationSection = await rendered.findByTestId(
    'customization-section'
  );

  const sectionText = customizationSection.querySelector(
    '[data-testid="customization-heading"]'
  ).innerHTML;

  expect(sectionText).toEqual(chipsAndGuac.customizations[0].title);

  const spiceOptions = await rendered.findAllByTestId('option');
  const firstOption = spiceOptions[0];

  fireEvent.click(firstOption);

  // TODO Select the cart checkout button

  const addItemButtonElm = await rendered.findByTestId('add-item');

  expect(addItemButtonElm.className.includes('selected'));

  fireEvent.click(addItemButtonElm);

  const cartItemRows = await rendered.findAllByTestId('cart-item-row');

  console.log(cartItemRows);

  // Expect that what's rendering in the cart is what you expect it to be.
});
