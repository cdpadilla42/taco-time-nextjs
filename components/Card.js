import React from 'react';
import styled from 'styled-components';
const StyledCard = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  width: 210px;
  color: #111;
  font-family: Inter, Helvetica, Arial, sans-serif;

  img {
    max-width: 600px;
    max-height: 210px;
  }

  .details {
    margin: 0.8rem;
  }

  h4 {
    font-size: 0.9rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.9rem;
  }
`;

const Card = () => {
  return (
    <StyledCard>
      <img src="https://picsum.photos/id/237/200/300" alt="" />
      <div className="details">
        <h4>Chips and Guac</h4>
        <p>Yummy Green Gooey stuff</p>
      </div>
    </StyledCard>
  );
};

export default Card;
