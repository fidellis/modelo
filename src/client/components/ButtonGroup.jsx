import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Component = ({ buttons, ...props}) => (
  <ButtonGroup {...props}>
    {buttons.map(({ label, ...rest }) => <Button {...rest}>{label}</Button>)}
  </ButtonGroup> 
);

Component.defaultProps = {
  buttons: [],
  variant: 'contained',
  color: 'primary',
};

export default Component;
