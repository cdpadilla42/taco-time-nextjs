import { useCombobox } from 'downshift';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';

const SEARCH_ITEMS = gql`
  query SEARCH_ITEMS($searchTerm: String!) {
    allItems(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      name
      description
    }
  }
`;

const StyledSearch = styled.form`
  input {
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  background: white;
`;

const DropDownItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  width: 100%;
`;

export default function Search() {
  const items = [];
  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log('input changed');
    },
    itemToString: (item) => item?.name || '',
    onSelectedItemChange({ selectedItem }) {
      console.log(`selected ${selectedItem.name}`);
    },
  });

  const [searchItems, { data, loading, error }] = useLazyQuery(SEARCH_ITEMS, {
    variables: {
      searchTerm: inputValue,
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await searchItems();
    console.log(data);
  }

  return (
    <StyledSearch onSubmit={handleSubmit}>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && 'items here'}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </StyledSearch>
  );
}
