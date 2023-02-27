import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import { priceToString } from '../lib/utility';
import CustomizationDisplay from './CustomizationDisplay';
import AddItemToCart from './AddItemToCart';

const CartItemForm = ({ item, itemID, cartItem, onSubmit }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(
    cartItem?.selectedOptions || {}
  );
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);
  const [submissionVerified, setsubmissionVerified] = useState(false);
  const { CartItemID } = router.query;

  /*
  Handling required fields:

  Filter the list and put the required fields in the initial state with null values
  when submitting, if any value is null, error
  */

  useEffect(() => {
    if (!Object.keys(selectedOptions).length) {
      item.customizations.forEach((customization) => {
        console.log(customization.name, customization.required);
        if (customization.required) {
          setSelectedOptions((prevState) => {
            return { ...prevState, [customization.name]: null };
          });
        }
      });
    }
  }, [item]);

  function verifyRequiredCustomizationsSelected() {
    return Object.keys(selectedOptions).every((key) => {
      return selectedOptions[key];
    });
  }

  function calculateAddOnsTotal() {
    // find every add on in state and check if there is an additional price
    // if so, add it to the total
    const addOnsTotalPrice = item.customizations.reduce((p, customization) => {
      function extractPriceFromValue(valueInState) {
        const optionObj = customization.options.find(
          (option) => option.name === valueInState
        );
        // if so, add to total
        if (optionObj.price) return optionObj.price;
        // if nothing found, return 0
        return 0;
      }

      const valueInState = selectedOptions[customization.name];
      // if not in state, continue
      if (!valueInState) return p;
      // access this customization in state
      // Check if single value or array
      if (typeof valueInState === 'string') {
        // if single value, check if there is an added price
        return p + extractPriceFromValue(valueInState);
      } else {
        const valuesFromArr = valueInState.reduce((p, singleCustomization) => {
          return p + extractPriceFromValue(singleCustomization);
        }, 0);
        return valuesFromArr + p;
      }
    }, 0);
    return addOnsTotalPrice;
  }

  function addPriceAndAddons() {
    return calculateAddOnsTotal() + item.price;
  }

  useEffect(() => {}, [selectedOptions]);

  useEffect(() => {
    setsubmissionVerified(verifyRequiredCustomizationsSelected());
  }, [selectedOptions]);

  const handleSubmit = () => {
    const payloadObj = {
      id: itemID,
      quantity,
      selectedOptions,
      price: addPriceAndAddons(),
      name: item.name,
    };
    if (CartItemID) {
      payloadObj.cartItemID = CartItemID;
    } else {
      payloadObj.image = item.img;
      payloadObj.cartItemId = uuid();
    }
    onSubmit(payloadObj);
  };

  return (
    <StyledItemDetails>
      <div className="container">
        <img src={item.img} alt="" />
        <h2 data-testid="item-header">{item.name}</h2>
        <p>{priceToString(item.price)}</p>
        <p>{item.description}</p>
      </div>
      <div className="options">
        {item.customizations.map((customizeable) => {
          return (
            <CustomizationDisplay
              key={customizeable.name}
              customizeable={customizeable}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          );
        })}
      </div>
      <AddItemToCart
        quantity={quantity}
        setQuantity={setQuantity}
        price={addPriceAndAddons()}
        itemID={itemID}
        image={item.img}
        selectedOptions={selectedOptions}
        name={item.name}
        submissionVerified={submissionVerified}
        calculateAddOnsTotal={calculateAddOnsTotal}
        cartItemID={cartItem?.cartItemId}
        onSubmit={handleSubmit}
        isCartItem={!!CartItemID}
      />
    </StyledItemDetails>
  );
};

export default CartItemForm;

const StyledItemDetails = styled.div`
  img {
    display: block;
    width: 300px;
    margin: 0 auto;
  }

  .options .title {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.6rem;
    margin: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h2 {
      margin: 1rem 0.5rem;
    }
  }

  /* single option */
  .option {
    border: 2px solid rgba(0, 0, 0, 0.1);
    margin: 1rem;
    padding: 1rem;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
    width: calc(100% - 2rem);
    display: block;
    background-color: rgba(0, 0, 0, 0);
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    box-sizing: border-box;
    transition: background-color 0.4s ease;
  }

  .option:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .option.selected {
    border: 2px solid rgba(0, 0, 0, 1);
    background-color: rgba(0, 0, 0, 0.08);
  }

  .added-price {
    display: block;
    float: right;
  }
`;
