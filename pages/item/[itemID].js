import React from 'react';
import { useRouter } from 'next/router';
import { dummyData } from '../../lib/dummyData';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../../apollo/client';
import { priceToString } from '../../lib/utility';

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

const ItemsQuery = gql`
  query ItemQuery {
    item {
      _id
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
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 1rem;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
    width: 100%;
    display: block;
    background-color: rgba(0, 0, 0, 0);
    font-family: inherit;
    font-size: inherit;
    text-align: left;
  }

  .option:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .option.selected {
    border: 2px solid rgba(0, 0, 0, 1);
  }
`;

const itemDisplay = () => {
  const router = useRouter();
  const { itemID } = router.query;

  console.log(itemID);

  const {
    data: { itemById: item },
  } = useQuery(ItemByIdQuery, {
    variables: {
      id: itemID,
    },
  });

  console.log(item, 'from the itemDisplay');
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
        {testItem.customizations.map((customizeable) => {
          return (
            <>
              <div className="title">
                <h2>{customizeable.title}</h2>
              </div>
              {customizeable.options.map((option) => {
                return (
                  <button className="option">
                    <p>
                      {option.name} {option.price ? ` + $${option.price}` : ''}
                    </p>
                  </button>
                );
              })}
            </>
          );
        })}
      </div>
    </StyledItemDetails>
  );
};

// // This function gets called at build time
// export async function getStaticPaths() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: ItemsQuery,
//   });

//   const itemIds = apolloClient.cache.extract();

//   console.log(itemIds);

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };

//   // * Notes from docs ------------

//   // Call an external API endpoint to get posts
//   const res = await fetch('https://.../posts');
//   const posts = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

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
