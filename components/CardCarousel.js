import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import arr from '../lib/dummyData';

const StyledCardCarousel = styled.div`
  width: 100%;
  /* border: 1px solid blue; */
  display: flex;
  overflow: scroll;
  gap: 0.5rem;

  & > * {
    flex: 0 0 208px;
  }
`;

const CardCarousel = () => {
  return (
    <StyledCardCarousel>
      {arr.map((item) => (
        <Card item={item} />
      ))}
    </StyledCardCarousel>
  );
};

export default CardCarousel;
