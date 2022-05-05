import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Component = ({ children, onClick, ...props }) => (<Icon {...props} onClick={() => confirm('Deseja excluir?') ? onClick() : null}>delete</Icon>);

Component.propTypes = {
    children: PropTypes.node.isRequired,
};

Component.defaultProps = {};

export default Component;
