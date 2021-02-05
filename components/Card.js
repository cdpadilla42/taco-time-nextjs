import React from 'react';
import Link from 'next/link';
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
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  .image_display {
    width: 100%;
    height: 140px;
    background-position: center;
    background-size: cover;
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
    margin: 0;
  }
`;

const Card = ({ item }) => {
  const router = useRouter();

  return (
    <Link href={`/item/${item._id}`}>
      <a style={{ textDecoration: 'none' }}>
        <StyledCard>
          <div
            className="image_display"
            style={{ backgroundImage: `url('${item.img}')` }}
          ></div>
          <div className="details">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>
        </StyledCard>
      </a>
    </Link>
  );
};

export default Card;
