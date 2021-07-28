import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Component = ({ ...props}) => (
  <Link {...props} /> 
);

Component.defaultProps = {};

export default Component;