import React, { useState, useEffect } from 'react';
import { getData } from '~/lib/api';
import { Select } from '~/components/form/form';

const Component = ({ url, params, ...props }) => {
    const [options, setOptions] = useState([]);

    async function change(){
        const data = await getData(url, params);
        setOptions(data);
    }

    useEffect(() => {
        change();
    }, [])

    return(
        <select {...props} >
            {options.map(o => <option>{o.nome}</option>)}
        </select>
)};

Component.defaultProps = {
  url: '/tipoResponsavel',
  id: 'id',
  label: '',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { order: ['nome'] }  
};

export default Component;
