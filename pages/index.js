import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import CardCarousel from '../components/CardCarousel';
import ItemFrom from '../components/ItemForm';
import Cart from '../components/Cart';

import connectDb from '../lib/mongoose';

const ItemsQuery = gql`
  query ItemQuery {
    item {
      name
      price
      img
      _id
    }
  }
`;

const Index = () => {
  const {
    data: { item: itemsArr },
  } = useQuery(ItemsQuery);

  console.log(itemsArr);
  return (
    <>
      <ItemFrom />
      <CardCarousel itemsArr={itemsArr} />
      <Cart />
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
