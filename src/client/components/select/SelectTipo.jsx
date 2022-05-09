import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
  url: '/teste/tipo',
  id: 'tipo_id',
  label: 'Tipo',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { order: ['nome'], cache: 28800 },
};

export default Component;
