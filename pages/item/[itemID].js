import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { dummyData } from '../../lib/dummyData';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { priceToString } from '../../lib/utility';
import { initializeApollo } from '../../apollo/client';
import CustomizationDisplay from '../../components/CustomizationDisplay';

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
        options {
          name
          price
        }
      }
    }
  }
`;

const StyledItemDetails = styled.div`
  img {
    display: block;
    width: 300px;
    margin: 0 auto;
  }

  .options .title {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.6rem;
    margin: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h2 {
      margin: 1rem 0.5rem;
    }
  }

  /* single option */
  .option {
    border: 2px solid rgba(0, 0, 0, 0.1);
    margin: 1rem;
    padding: 1rem;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
    width: calc(100% - 2rem);
    display: block;
    background-color: rgba(0, 0, 0, 0);
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    display: border-box;
    box-sizing: border-box;
  }

  .option:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .option.selected {
    border: 2px solid rgba(0, 0, 0, 1);
    background-color: rgba(0, 0, 0, 0.08);
  }

  .added-price {
    display: block;
    float: right;
  }
`;

const itemDisplay = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  /*

  Hold state at the top,

  Dynamically create state for your options here:

  {
    tortilla: flour,
    ingredients: [
      noPineapple
    ]
  }

  Submit with form
  */

  // TODO: Fix border resizing on item selection

  const router = useRouter();
  const { itemID } = router.query;

  const {
    data: { itemById: item },
  } = useQuery(ItemByIdQuery, {
    variables: {
      id: itemID,
    },
  });

  const testItem = dummyData;
  return (
    <StyledItemDetails>
      <div className="container">
        <img src={item.img} alt="" />
        <h2>{item.name}</h2>
        <p>{priceToString(item.price)}</p>
        <p>{item.description}</p>
      </div>
      <div className="options">
        {item.customizations.map((customizeable) => {
          return (
            <CustomizationDisplay
              key={customizeable.name}
              customizeable={customizeable}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          );
        })}
      </div>
    </StyledItemDetails>
  );
};

export async function getServerSideProps({ params }) {
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
