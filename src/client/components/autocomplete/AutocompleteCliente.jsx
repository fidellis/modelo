import React from 'react';
import api, { getData } from '~/lib/api';
import { SelectAsync } from '~/components/form/form/inputs';

const cache = 28800; // 8h
const AutocompleteCliente = ({ url, ...props }) => (
    <SelectAsync
        {...props}
        isOptionDisabled={(option) => props.values.includes(option.mci)}
        getOptions={(value) => {
            const inputValue = Number(value) ? { mci: value } : { nomeCliente: { $iLike: `%${value}%`.toUpperCase() } };
            return api.get(url, { params: { ...inputValue, limit: 10, cache } }).then(res => res.data);
        }}
    />
);

AutocompleteCliente.defaultProps = {
    url: '/mci/cli',
    id: 'mci',
    // label: 'Convênio',
    placeholder: 'Digite o nome ou número do cliente...',
    optionValue: 'mci',
    optionLabel: 'nomeCliente',
    formatOptionLabel: p => `${p.mci} - ${p.nomeCliente}`,
    values: [],
};

export default AutocompleteCliente;