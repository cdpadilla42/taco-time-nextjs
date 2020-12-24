import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import Layout from '../components/Layout';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../lib/redux';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // TODO Here, implement local storage to persist guest data. If user has items in local storage, add this to redux state

  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProvider>
    </ApolloProvider>
  );
}
