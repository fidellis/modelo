import React from 'react';
import Label from './Label';
import './input.css';

const ComponentContainer = ({ children, label, style, info, ...props }) => {  
  return (
    <div className="input-container" style={style}>
        {label && <Label>{label}</Label>}
        {children} 
	    {info && <div className="input-container-info">{info}</div>}
    </div>);
};

ComponentContainer.defaultProps = {};

export default ComponentContainer;
