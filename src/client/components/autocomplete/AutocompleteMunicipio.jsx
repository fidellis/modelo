import React from 'react';
import api, { getData } from '~/lib/api';
import { SelectAsync } from '~/components/form/form/inputs';

const cache = 28800; // 8h
const AutocompleteCliente = ({ url, values, ...props }) => {
    return (
        <SelectAsync
            {...props}
            isOptionDisabled={(option) => values.includes(Number(option.id))}
            getOptions={(value) => {
                const inputValue = Number(value) ? { id: value } : { nome: { $iLike: `%${value}%`.toUpperCase() } };
                return api.get(url, { params: { ...inputValue, limit: 10, cache } }).then(res => res.data.map(d => ({ ...d, id: Number(d.id) })));
            }}
        />
    )
};

AutocompleteCliente.defaultProps = {
    url: '/arg/municipio',
    id: 'id',
    label: 'Município',
    placeholder: 'Digite o nome ou número do município...',
    optionValue: 'id',
    optionLabel: 'nome',
    // labelRenderer: ({ id, nome }) => `${id} - ${nome}`,
    formatOptionLabel: p => `${p.id} - ${p.nome} (${p.uf})`,
    values: [],
};

export default AutocompleteCliente;