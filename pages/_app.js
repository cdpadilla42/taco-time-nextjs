import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import Layout from '../components/Layout';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../lib/redux';
import '../lib/nprogress.css';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

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
