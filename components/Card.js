import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const StyledCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 210px;
  color: #111;
  font-family: Inter, Helvetica, Arial, sans-serif;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

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

const Card = ({ item }) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/item/${item._id}`);
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleClick();
  }

  return (
    <StyledCard onClick={handleClick} tabIndex={0} onKeyUp={handleKey}>
      <img src={item.img} alt="" />
      <div className="details">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
    </StyledCard>
  );
};

export default Card;
