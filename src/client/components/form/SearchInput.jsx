import React from 'react';
import { TextInput } from '~/components/form/form';
import { filtra } from '~/lib/filters';


const SearchInput = ({ rows, getRows, ...props }) => {
  function onChange({ value }) {
    const data = filtra(rows.slice(), value);
    getRows(data);
  }

  return (
    <TextInput
      {...props}
      onChange={onChange}
      value={null}
    />
  );
};

SearchInput.defaultProps = {
  placeholder: 'Pesquisar...',
  rows: [],
  getRows: () => console.log('Não definido'),
};

export default SearchInput;
