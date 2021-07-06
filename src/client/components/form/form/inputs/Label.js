import React from 'react';

const Label = ({ id, children, ...props }) => {  
  return <label htmlFor={id} className="input-label">{children}</label>;
};

Label.defaultProps = {

};

export default Label;
