import React, { useEffect } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import Nav from './Nav';
import Cart from '../components/Cart';
import { useDispatch } from 'react-redux';
import { closeCart } from '../lib/redux';
import Search from './Search';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window !== undefined) {
      dispatch(closeCart());
    }
  }, []);

  const GlobalStyle = createGlobalStyle`
    
    * {
      font-family: Inter, Helvetica, Arial, sans-serif;
    }

    body {
      margin: 0;
      overflow-x: hidden;
    }

    p, h1, h2, h3, h4, h5, h6 {
      margin: 1rem 1rem;
      padding: 0;
    }


    .layout {

      position: relative;

    }

    .page_wrap {
      margin-top: 53px;
    }

    main {
      margin: 0 auto;
      max-width: 1278px;
      padding-top: 1rem;
    }

    /* latin-ext */
@font-face {
  font-family: 'Merienda';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('public/gNMAW3x8Qoy5_mf8uWu-FZ-73MbLP1S5ijo.woff2') format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merienda';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/merienda/v9/gNMAW3x8Qoy5_mf8uWu-FZ-13MbLP1S5.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
  `;

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Taco Time</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
      </Head>
      <div className="layout">
        <Cart />
        <Nav />
        <div className="page_wrap">
          <Search />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
