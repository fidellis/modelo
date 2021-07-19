import config from '../../../package.json';

/*  configurações gerais do frontend */
const env = process.env.AMBIENTE || 'desenvolvimento';

const commonConfig = { ...config.app, baseUrl: '' };

const envConfig = {
  desenvolvimento: {
    apiUrl: `http://localhost.bb.com.br:${commonConfig.port}/api`,
    // arquivoUrl: 'localhost.bb.com.br:3003/api/arquivo',
    arquivoUrl: 'https://diemp2.intranet.bb.com.br/arquivos/api/arquivo',
  },
  producao: {
    apiUrl: `https://diemp2.intranet.bb.com.br/${commonConfig.path}/api`,
    arquivoUrl: 'https://diemp2.intranet.bb.com.br/arquivos/api/arquivo',
    baseUrl: `${commonConfig.path}`,
  },
  staging: {
    apiUrl: `//disem5.intranet.bb.com.br/${commonConfig.path}/api`,
    arquivoUrl: 'https://diemp2.intranet.bb.com.br/arquivos/api/arquivo',
    baseUrl: `${commonConfig.path}`,
  },
};

export default { ...commonConfig, ...envConfig[env] };

