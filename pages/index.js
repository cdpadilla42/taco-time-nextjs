import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import CardCarousel from '../components/CardCarousel';
import ItemFrom from '../components/ItemForm';
import connectDb from '../lib/mongoose';

const ItemsQuery = gql`
  query ItemQuery {
    allItems {
      name
      price
      img
      description
      category
      id
    }
  }
`;

const StyledIndex = styled.div`
  padding: 1rem;

  .section_heading {
    border-bottom: 1px dotted #ef3340;
    margin: 1rem 0;
  }

  h1 {
    text-align: center;
    font-family: 'Merienda', cursive;
    margin-top: 0;
  }

  h2 {
    margin: 1rem 0;
  }
`;

const Index = () => {
  const { data, error } = useQuery(ItemsQuery);

  const itemsArr = data?.allItems;

  console.log(data);

  function filterByCategory(categoryQuery) {
    return itemsArr.filter((item) => item.category === categoryQuery);
  }

  if (error) return <p>Woops! Something went wrong...</p>;

  return (
    <StyledIndex>
      <h1>Menu</h1>
      <div className="section_heading">
        <h2>Sides and Apetizers</h2>
      </div>
      <CardCarousel itemsArr={filterByCategory('side')} />
      <div className="section_heading">
        <h2>Breakfast Tacos</h2>
      </div>
      <CardCarousel itemsArr={filterByCategory('breakfast')} />
      <div className="section_heading">
        <h2>Lunch Tacos</h2>
      </div>
      <CardCarousel itemsArr={filterByCategory('lunch')} />
    </StyledIndex>
  );
};

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: ItemsQuery,
    });

    console.log(apolloClient.cache.extract());

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (e) {
    throw new Error(e);
  }
}

export default Index;
