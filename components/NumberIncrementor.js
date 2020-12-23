import React from 'react';
import styled from 'styled-components';

const StyledNumberIncrementor = styled.div`
  display: flex;

  div {
    box-sizing: border-box;
    border: 1px solid rgb(217, 217, 217);
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

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
