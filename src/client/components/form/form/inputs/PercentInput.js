import React from 'react';
import PropTypes from 'prop-types';
import NumberInput from './NumberInput';
import ComponentContainer from './ComponentContainer';

const PercentInput = ({ value, ...inputProps }) => (
    <NumberInput
      {...inputProps}
      value={value > 100 ? 100 : value}
    />
);

PercentInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

PercentInput.defaultProps = {
    maxLength: 4,
    suffix: '%'
};

export default PercentInput;
