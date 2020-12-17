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
  const dummyData = {
    img: 'https://picsum.photos/id/237/200/300',
    name: 'Chips & Guac',
    description: 'Yummy green good stuff!',
    _id: Math.random() * 100,
  };
  const arr = new Array(6);
  arr.fill(dummyData);

  return (
    <StyledCardCarousel>
      {arr.map((item) => (
        <Card item={item} />
      ))}
    </StyledCardCarousel>
  );
};

export default CardCarousel;
