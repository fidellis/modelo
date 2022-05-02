import React, { useState, useEffect } from 'react';
import { getData } from '~/lib/api';
import { Select } from '~/components/form/form/inputs';

const Component = ({ url, params, ...props }) => {
    const [options, setOptions] = useState([]);

    async function change() {
        const data = await getData(url, params);
        setOptions(data);
    }

    useEffect(() => {
        change();
    }, [])

    return (
        <Select {...props} options={options} />
    )
};

Component.defaultProps = {
    url: '/',
    id: '',
    label: '',
    optionValue: 'id',
    optionLabel: 'nome',
};

export default Component;
