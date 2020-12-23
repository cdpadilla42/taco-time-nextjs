import React from 'react';
import styled from 'styled-components';

const StyledNumberIncrementor = styled.div`
  display: flex;

  button {
    margin: 0;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    padding: 0;
  }

  .plus,
  .minus,
  .value {
    border: 1px solid rgb(217, 217, 217);
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    span {
      text-align: center;
    }
  }
`;

const NumberIncrementor = () => {
  return (
    <StyledNumberIncrementor>
      <button className="minus">
        <span>-</span>
      </button>
      <div className="value">
        <span>{'1'}</span>
      </div>
      <button className="plus">
        <span>+</span>
      </button>
    </StyledNumberIncrementor>
  );
};

export default NumberIncrementor;
