import React from 'react';

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

  function isOptionSelected(customizableName, option) {
    return selectedOptions[customizableName] === option;
  }

  return (
    <>
      <div className="title">
        <h2>{customizeable.title}</h2>
        {/* {customizeable.required && <p>Required</p>} */}
      </div>
      {customizeable.options.map((option) => {
        return (
          <button
            className={
              isOptionSelected(customizeable.name, option.name)
                ? 'option selected'
                : 'option'
            }
            key={option.name}
            onClick={() => handleClick(option)}
          >
            <span>
              <span>{option.name}</span>
              {/* {option.price ? (
                <span className="added-price">{`+ ${priceToString(
                  option.price
                )}`}</span>
              ) : (
                ''
              )} */}
            </span>
          </button>
        );
      })}
    </>
  );
};

export default CustomizationDisplay;
