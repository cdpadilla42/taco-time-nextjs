import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import CardCarousel from '../components/CardCarousel';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`;

const Index = () => {
  const {
    data: { viewer },
  } = useQuery(ViewerQuery);

  return <CardCarousel />;

  // return (
  //   <div>
  //     You're signed in as {viewer.name} and you're {viewer.status} goto{' '}
  //     <Link href="/about">
  //       <a>static</a>
  //     </Link>{' '}
  //     page.
  //   </div>
  // )
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
