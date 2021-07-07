import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from './ButtonGroup';

const Component = ({ ...props}) => (
  <ButtonGroup {...props} /> 
);

Component.defaultProps = {
    style : {
        position: 'fixed', 
        right: 50,
        bottom: 50,
        zIndex: 1,
    }
};

export default Component;
