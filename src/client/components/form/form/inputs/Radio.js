import React from 'react';
import ComponentContainer from './ComponentContainer';

function isJson(str) {
  if (Number(str)) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const Radio = ({ id, value, label, options, onChange, ...props }) => (
  <ComponentContainer label={label}>
    <div className="input-radio-container">
      {options.map(option => (
        <label htmlFor={id} className="input-radio">          
          <input
            {...props}
            type="radio"
            id={id}
            name={id}
            value={option.value}
            checked={value == option.value}
            onChange={(e) => {
              let v = e.target.value;
              if (isJson(v)) v = JSON.parse(v);
              onChange({ id, value: v });
            }}
          />          
          <span>{option.label}</span>
        </label>),
      )}
    </div>
  </ComponentContainer>
)
  ;

Radio.defaultProps = {
  options: [],
};

export default Radio;
