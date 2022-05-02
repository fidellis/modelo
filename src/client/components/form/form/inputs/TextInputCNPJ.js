import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

function mask(v = '') {
    return v.replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
        .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // captura os dois últimos 2 números, com um - antes dos dois números
}
const PercentInput = ({ value, onChange, ...inputProps }) => (
    <TextInput
        {...inputProps}
        value={mask(value)}
        onChange={(e) => onChange({ ...e, value: e.value.replace(/\D/g, '').replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '') })}
        maxLength={18}
    />
);

PercentInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
};

PercentInput.defaultProps = {
    id: 'cnpj',
    label: 'CNPJ',
};

export default PercentInput;
