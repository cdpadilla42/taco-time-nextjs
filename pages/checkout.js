import React from 'react';
import styled from 'styled-components';

const StyledChecout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  font-weight: 700;
`;

const checkout = () => {
  return <StyledChecout>Thank you for shopping Taco Time! :)</StyledChecout>;
};

export default checkout;
