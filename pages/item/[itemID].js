import React from 'react';
import { useRouter } from 'next/router';
import { dummyData } from '../../lib/dummyData';
import styled from 'styled-components';
import gql from 'graphql-tag';

const ItemByIdQuery = gql`
  query getItem($id: ID!) {
    itemById(id: $id) {
      name
    }
  }
`;

const StyledItemDetails = styled.div`
  img {
    display: block;
    width: 300;
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
  const testItem = dummyData;

  const router = useRouter();
  const { itemID } = router.query;
  return (
    <StyledItemDetails>
      <div className="container">
        <img src={testItem.img} alt="" />
        <h2>{testItem.name}</h2>
        <p>$1,000,000</p>
        <p>{testItem.description}</p>
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
//   // Call an external API endpoint to get posts
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`https://.../posts/${params.id}`)
//   const post = await res.json()

//   // Pass post data to the page via props
//   return { props: { post } }
// }

export default itemDisplay;
