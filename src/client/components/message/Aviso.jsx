import React from 'react';
import PropTypes from 'prop-types';
import './Aviso.scss';

const Aviso = ({ children, className }) => (

  <div
    className={['aviso', className].join(' ')}
  >
    {children}
  </div>
);

Aviso.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Aviso.defaultProps = {
  className: '',
};

export default Aviso;
