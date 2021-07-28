import React from 'react';
import PropTypes from 'prop-types';
import config from '~/config';

const isDev = process.env.AMBIENTE !== 'producao';

const Component = ({ ...props, imagemId }) => (
  <img 
    {...props} 
    src={`${config.arquivoUrl}/${imagemId}${isDev ? '?token=55f0f1d1927d0321e376974eb9b2088d' : ''}`}
  /> 
);

Component.defaultProps = {};

export default Component;
