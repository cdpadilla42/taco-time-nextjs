/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
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
      spice: 'Medium',
    },
  };

  const handleSubmit = jest.fn();

  const store = initStore();
  store.dispatch({
    type: 'ADD_TO_CART',
    payload: {
      ...formExpectedValue,
    },
  });

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

  expect(!firstOption.className.includes('selected'));

  fireEvent.click(firstOption);

  const updateCartItemButtonElm = await rendered.findByTitle(
    'Save Order Changes'
  );

  expect(firstOption.className.includes('selected'));

  fireEvent.click(updateCartItemButtonElm);

  const cartItemRows = await rendered.findAllByTestId('cart-item-row');

  const firstItemElm = cartItemRows[0];

  const firstItemTitle = firstItemElm.querySelector(
    '[data-testid="cart-item-title"]'
  );
  const customizationElms = firstItemElm.querySelectorAll(
    '[data-testid="cart-item-customization"]'
  );

  expect(firstItemTitle.innerHTML).toEqual('1 Guacamole &amp; Chips');

  const expectedCustomizations = ['Mild'];

  expect(customizationElms.length).toEqual(expectedCustomizations.length);

  customizationElms.forEach((customizationElm, i) => {
    expect(customizationElm.innerHTML).toEqual(expectedCustomizations[i]);
  });
});
