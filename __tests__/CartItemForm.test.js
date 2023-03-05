/**
 * @jest-environment jsdom
 */
import React from 'react';
import * as reactRedux from 'react-redux';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import CartItemForm from '../components/CartItemForm';

jest.mock('uuid', () => ({
  v4: () => '',
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: () => '5feb9e4a351036315ff4588a',
  }),
}));

const dispatchMock = reactRedux.useDispatch;

beforeEach(() => {
  dispatchMock.mockImplementation(() => (args) => {});
});

afterEach(() => {
  dispatchMock.mockClear();
  cleanup();
});

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

  const formExpectedValue = {
    cartItemId: '',
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

  const rendered = render(
    <CartItemForm
      item={chipsAndGuac}
      itemID={'5feb9e4a351036315ff4588a'}
      onSubmit={handleSubmit}
    />
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

  const addItemButtonElm = await rendered.findByTestId('add-item');

  expect(addItemButtonElm.className.includes('selected'));

  fireEvent.click(addItemButtonElm);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(formExpectedValue);
});
