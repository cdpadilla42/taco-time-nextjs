/**
 * @jest-environment jsdom
 */
import React from 'react';
import * as reactRedux from 'react-redux';
import { render, cleanup, waitFor } from '@testing-library/react';
import ItemDisplay from '../pages/item/[itemID]';

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

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: () => '5feb9e4a351036315ff4588a',
  }),
}));

jest.mock('@apollo/client', () => ({
  useQuery: () => ({
    data: {
      itemById: chipsAndGuac,
    },
  }),
}));

jest.mock('../lib/mongoose', () => () => {});

test('<ItemDisplay />', async () => {
  const rendered = render(<ItemDisplay />);
  const pageTitleElm = await rendered.findByTestId('item-header');

  expect(pageTitleElm.innerHTML).toEqual('Guacamole &amp; Chips');
});
