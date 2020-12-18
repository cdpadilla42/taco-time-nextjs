import React from 'react';
import { createGlobalStyle } from 'styled-components';

const Layout = ({ children }) => {
  const GlobalStyle = createGlobalStyle`
    * {
      font-family: Inter, Helvetica, Arial, sans-serif;
    }
  `;
  return (
    <div className="layout">
      <GlobalStyle />
      {children}
    </div>
  );
};

export default Layout;
