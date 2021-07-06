import React from 'react';
import PropTypes from 'prop-types';

export function isAdmin(usuario) {
  const { prefixo } = usuario;
  const prefixos = [9951, 9973];
  if (prefixos.includes(prefixo)) return true;
  return false;
}

const Classificacao = ({ usuario }) => {
  const classificacao = isAdmin(usuario) ? '#interna' : '#confidencial';

  return (<span>{classificacao}</span>);
};

Classificacao.propTypes = {
  usuario: PropTypes.string.isRequired,
};

export default Classificacao;
