import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Nav from './Nav';

const Layout = ({ children }) => {
  const GlobalStyle = createGlobalStyle`
    * {
      font-family: Inter, Helvetica, Arial, sans-serif;
    }

    body {
      margin: 0;
    }

    p, h1, h2, h3, h4, h5, h6 {
      margin: 1rem 1rem;
      padding: 0;
    }
  `;
  return (
    <div className="layout">
      <GlobalStyle />
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
