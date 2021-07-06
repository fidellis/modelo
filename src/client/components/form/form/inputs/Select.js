import React from 'react';
import ComponentContainer from './ComponentContainer';

const Select = (props) => {
  const { label, options, value, onChange, ...inputProps } = props;
  return (
    <ComponentContainer label={label}>
      <select
        {...inputProps}
        onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
        className="input input-select"
        value={value}
      >
			{/*<option></option>*/}
		{options.map(option => <option className="input-select-option">{option.label}</option>)}
	  </select>
    </ComponentContainer>);
};

Select.defaultProps = {};

export default Select;
