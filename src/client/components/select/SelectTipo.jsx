import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
  url: '/tipo',
  id: 'tipo_id',
  label: 'Tipo',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { order: ['nome'] },
};

export default Component;
