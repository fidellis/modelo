import React from 'react';
import './RibbonEnv.scss';

const env = process.env.AMBIENTE;

const RibbonEnv = () => {
  if (env === 'producao') return null;
  const msg = env === 'desenvolvimento' ? 'Desenvolvimento' : 'Homologação';
  return <a className={['github-fork-ribbon', env].join(' ')} title={msg}>{msg}</a>;
};

export default RibbonEnv;
