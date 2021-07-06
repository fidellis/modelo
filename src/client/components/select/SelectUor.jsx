import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
  url: '/uor/uor',
  id: 'id',
  label: 'UOR',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { prefixo: 9973, order: ['nome'] }  
};

export default Component;
