import React from 'react';
import styled from 'styled-components';

const StyledCart = styled.div`
  height: 100vh;

  .heading {
    padding: 1rem;
    display: flex;
    width: calc(100% - 2rem);
    border-bottom: 2px solid rgb(217, 217, 217);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
    align-items: center;

    h4 {
      margin: 0;
      padding: 0;
      flex: 1;
    }

    button {
      border: none;
      background-color: rgba(0, 0, 0, 0);
      cursor: pointer;
      font-size: 2rem;
      transform: translateY(-4px);
    }
  }
`;

const Cart = () => {
  return (
    <StyledCart>
      <div className="heading">
        <h4>Your Order</h4>
        <button>&times;</button>
      </div>
      <div className="items_display">
        <div className="item_row">
          <div className="left">
            <div className="item_details">1 Fundido Sirloin</div>
            <ul className="item_customizations">
              <li>Flour</li>
            </ul>
          </div>
          <div className="right">
            <span className="price">$4.50</span>
            <button className="remove">&times;</button>
          </div>
        </div>
      </div>
    </StyledCart>
  );
};

export default Cart;
