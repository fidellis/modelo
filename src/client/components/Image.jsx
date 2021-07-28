import React from 'react';
import PropTypes from 'prop-types';

const Component = ({ ...props}) => (
  <img {...props} /> 
);

Component.defaultProps = {};

export default Component;
