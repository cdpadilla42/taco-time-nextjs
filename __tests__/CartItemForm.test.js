/**
 * @jest-environment jsdom
 */
import React from 'react';
import * as reactRedux from 'react-redux';
import { render, cleanup, waitFor } from '@testing-library/react';
import CartItemForm from '../components/CartItemForm';

jest.mock('uuid', () => ({
  v4: () => '',
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: () => '5feb9e4a351036315ff4588a',
  }),
}));

// Use this code if you are dependent on the state in Redux

// const mockSelectors = (selector, store) => {
//   if (selector === ourSuperComplexCustomSelector) {
//     return true; // or what we want to
//   }
//   return selector(store);
// };

// beforeEach(() => {
//   useDispatchMock.mockImplementation(() => () => {});
//   useSelectorMock.mockImplementation((selector) =>
//     mockSelectors(selector, mockStore)
//   );
// });

// afterEach(() => {
//   useDispatchMock.mockClear();
//   useSelectorMock.mockClear();
//   cleanup();
// });

// const useSelectorMock = reactRedux.useSelector;
// const useDispatchMock = reactRedux.useDispatch;

test('<CartItemForm />', async () => {
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

  const rendered = render(
    <CartItemForm item={chipsAndGuac} itemID={'5feb9e4a351036315ff4588a'} />
  );
  const pageTitleElm = await rendered.findByTestId('item-header');

  expect(pageTitleElm.innerHTML).toEqual('Guacamole &amp; Chips');
});
