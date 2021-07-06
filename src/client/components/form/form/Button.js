import React from 'react';
import './button.css';

const Button = ({ label, disabled, ...props }) => (
  <button {...props} disabled={disabled} className={`button ${disabled ? 'button-disabled' : ''}`} >{label}</button>
);

Button.defaultProps = {};

export default Button;
