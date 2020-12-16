import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 210px;
  color: #111;
  font-family: Inter, Helvetica, Arial, sans-serif;
  overflow: hidden;

  img {
    width: 208px;
    height: 140px;
  }

  .details {
    margin: 0.8rem;
    height: 130px;
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
