import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const Component = ({ children, ...props }) => (<Icon {...props}>{children}</Icon>);

Component.propTypes = {
  children: PropTypes.node.isRequired,
};

Component.defaultProps = {
  style: {
    cursor: 'pointer',
  },
};

export default Component;
