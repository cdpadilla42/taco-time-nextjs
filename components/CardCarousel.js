import React from 'react';
import Card from './Card';
import styled from 'styled-components';

const StyledCardCarousel = styled.div`
  width: 100%;
  display: flex;
  overflow: scroll;
  gap: 0.5rem;

  & > * {
    flex: 0 0 208px;
  }
`;

const CardCarousel = ({ itemsArr }) => {
  return (
    <StyledCardCarousel>
      {itemsArr.map((item) => (
        <Card item={item} key={item._id} />
      ))}
    </StyledCardCarousel>
  );
};

export default CardCarousel;
