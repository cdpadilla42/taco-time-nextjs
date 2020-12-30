import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import CardCarousel from '../components/CardCarousel';
import ItemFrom from '../components/ItemForm';
import connectDb from '../lib/mongoose';

const ItemsQuery = gql`
  query ItemQuery {
    item {
      name
      price
      img
      description
      category
      _id
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
  const {
    data: { item: itemsArr },
  } = useQuery(ItemsQuery);

  function filterByCategory(categoryQuery) {
    return itemsArr.filter((item) => item.category === categoryQuery);
  }
  console.log('filtered by lunch');

  console.log(itemsArr);
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

  // return (
  //   <div>w
  //     You're signed in as {viewer.name} and you're {viewer.status} goto{' '}
  //     <Link href="/about">
  //       <a>static</a>
  //     </Link>{' '}
  //     page.
  //   </div>
  // )
};

export async function getServerSideProps() {
  await connectDb()();
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ItemsQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
