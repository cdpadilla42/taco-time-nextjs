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
  h2 {
    color: green;
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
        <p>{testItem.description}</p>
      </div>
      <div className="options">
        {testItem.customizations.map((customizeable) => {
          return (
            <>
              <h3>{customizeable.title}</h3>
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
