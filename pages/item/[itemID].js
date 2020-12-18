import React from 'react';
import { useRouter } from 'next/router';
import { dummyData } from '../../lib/dummyData';
import styled from 'styled-components';

// TODO style this bad boy
const StyledItemDetails = styled.div`
  img {
    display: block;
    width: 300;
    margin: 0 auto;
  }

  .options .title {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.6rem;
    margin: 0;

    h2 {
      margin: 1rem 0.5rem;
    }
  }
`;

const itemDisplay = () => {
  const testItem = dummyData;

  const router = useRouter();
  const { itemID } = router.query;
  return (
    <StyledItemDetails>
      <div className="container">
        <img src={testItem.img} alt="" />
        <h2>{testItem.name}</h2>
        <p>$1,000,000</p>
        <p>{testItem.description}</p>
      </div>
      <div className="options">
        {testItem.customizations.map((customizeable) => {
          return (
            <>
              <div className="title">
                <h2>{customizeable.title}</h2>
              </div>
              {customizeable.options.map((option) => {
                return <p>{option.name}</p>;
              })}
            </>
          );
        })}
      </div>
    </StyledItemDetails>
  );
};

export default itemDisplay;
