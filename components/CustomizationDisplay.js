import React from 'react';

const CustomizationDisplay = ({
  customizeable,
  selectedOptions,
  setSelectedOptions,
}) => {
  function handleClick(option) {
    setSelectedOptions((prevState) => {
      console.log('selectMultiple', customizeable.selectMultiple);
      // if you can only select one option
      if (!customizeable.selectMultiple) {
        return {
          ...prevState,
          [customizeable.name]: option.name,
        };
        // if you can select multiple options
      } else {
        console.log('adding extras...');
        // if options have already been selected
        if (prevState[customizeable.name]) {
          const resultArr = [...prevState[customizeable.name], option.name];
          return {
            ...prevState,
            [customizeable.name]: resultArr,
          };
          // if no options have been selected
        } else {
          return {
            ...prevState,
            [customizeable.name]: [option.name],
          };
        }
      }
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
