import React from 'react';
import { priceToString } from '../lib/utility';

const CustomizationDisplay = ({
  customizeable,
  selectedOptions,
  setSelectedOptions,
}) => {
  function handleClick(option) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [customizeable.name]: option.name,
      };
    });
    console.log(customizeable.name, option.name);
  }

  return (
    <>
      <div className="title">
        <h2>{customizeable.title}</h2>
        {customizeable.required && <p>Required</p>}
      </div>
      {customizeable.options.map((option) => {
        return (
          <button
            className="option"
            key={option.name}
            onClick={() => handleClick(option)}
          >
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
