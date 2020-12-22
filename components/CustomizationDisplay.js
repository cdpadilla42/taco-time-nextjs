import React from 'react';
import { priceToString } from '../lib/utility';

const CustomizationDisplay = ({ customizeable }) => {
  return (
    <>
      <div className="title">
        <h2>{customizeable.title}</h2>
        {customizeable.required && <p>Required</p>}
      </div>
      {customizeable.options.map((option) => {
        return (
          <button className="option" key={option.name}>
            <p>
              <span>{option.name}</span>
              {option.price ? (
                <span className="added-price">{`+ ${priceToString(
                  option.price
                )}`}</span>
              ) : (
                ''
              )}
            </p>
          </button>
        );
      })}
    </>
  );
};

export default CustomizationDisplay;
