import React from 'react';
import Card from './Card';
import styled from 'styled-components';

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
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <StyledCardCarousel>
      {arr.map((item) => (
        <Card />
      ))}
    </StyledCardCarousel>
  );
};

export default CardCarousel;
