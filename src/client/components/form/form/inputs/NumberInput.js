import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import ComponentContainer from './ComponentContainer';

const NumberInput = ({ label, onChange, onBlur, value, prefix, suffix, ...inputProps }) => (
  <ComponentContainer label={label}>
    <CurrencyInput
      {...inputProps}
      value={(value || '').toString().replace('.', ',')}
      prefix={prefix}
      suffix={suffix}
      onChangeEvent={e => onChange({ e, id: e.target.id, value: Number(e.target.value.replace(/\./g, '').replace(',', '.').replace(prefix, '').replace(suffix, '')) })}
      onBlur={e => onBlur({ e, id: e.target.id, value: Number(e.target.value.replace(/\./g, '').replace(',', '.').replace(prefix, '').replace(suffix, '')) })}
      className="input input-number"
    />
  </ComponentContainer>
);

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

NumberInput.defaultProps = {
  value: undefined,
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: 2,
  prefix: undefined,
  suffix: undefined,
  onChange: () => console.log('onChange não definido'),
  onBlur: () => null,
};

export default NumberInput;
