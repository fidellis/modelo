import React, { useState, useEffect } from 'react';
import { getData } from '~/lib/api';
import { Select } from '~/components/form/form';

const Component = ({ url, params, ...props }) => {
    const [options, setOptions] = useState([]);

    async function change(){
        const data = await getData(url, params);
        console.log('data*******************', data)
        setOptions(data);
    }

    useEffect(() => {
        change();
    }, [])

    return(
        <Select
            {...props}
            options={options}
        />
)};

Component.defaultProps = {
  url: '/portal/usuario',
  id: 'id',
  label: 'Nome',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { prefixo: 9973, order: ['nome'] }  
};

export default Component;
