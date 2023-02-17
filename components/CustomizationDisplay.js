import React from 'react';
import { priceToString } from '../lib/utility';

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
          let resultArr;
          // find current index of selected item if in state
          const currentIndex = prevState[customizeable.name].indexOf(
            option.name
          );
          if (currentIndex !== -1) {
            // remove if found
            resultArr = [
              ...prevState[customizeable.name].splice(0, currentIndex),
              ...prevState[customizeable.name].splice(currentIndex + 1),
            ];
            resultArr[currentIndex];
          } else {
            resultArr = [...prevState[customizeable.name], option.name];
          }
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
  }

  function isOptionSelected(customizableName, option) {
    const customization = selectedOptions[customizableName];
    if (customization === undefined) {
      return false;
    }
    if (typeof customization === 'string') {
      return selectedOptions[customizableName] === option;
    } else if (Array.isArray(customization)) {
      return customization.includes(option);
    }
  }

  return (
    <>
      <div className="title">
        <h2>{customizeable.title}</h2>
        {customizeable.required && (
          <p>
            <span>*</span>
            <span>Required</span>
          </p>
        )}
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
            data-value={option.name}
            onClick={() => handleClick(option)}
            data-testid="option"
          >
            <span>
              <span>{option.name}</span>
              {option.price ? (
                <span className="added-price">{`+ ${priceToString(
                  option.price
                )}`}</span>
              ) : (
                ''
              )}
            </span>
          </button>
        );
      })}
    </>
  );
};

export default CustomizationDisplay;
