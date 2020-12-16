import React from 'react';
import Card from './Card';
import styled from 'styled-components';

const StyledCardCarousel = styled.div``;

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
