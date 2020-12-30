import gql from 'graphql-tag';
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
    <>
      <ItemFrom />
      <CardCarousel itemsArr={filterByCategory('side')} />
      <CardCarousel itemsArr={filterByCategory('breakfast')} />
      <CardCarousel itemsArr={filterByCategory('lunch')} />
    </>
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
