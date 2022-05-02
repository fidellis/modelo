import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

function mask(v = '') {
    return v
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}
const PercentInput = ({ value, onChange, ...inputProps }) => (
    <TextInput
        {...inputProps}
        value={mask(value)}
        onChange={(e) => onChange({ ...e, value: e.value.replace(/\D/g, '').replace(/\./g, '').replace(/\-/g, '') })}
        maxLength={14}
    />
);

PercentInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
};

PercentInput.defaultProps = {
    id: 'cpf',
    label: 'CPF',
};

export default PercentInput;