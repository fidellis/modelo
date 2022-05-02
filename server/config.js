'use strict';

const path = require('path');

const config = require(path.join(process.cwd(), 'package.json'));

/* configurações gerais do backend */
const serverConfig = {

  public: path.join(process.cwd(), 'public'),

  routes: {
    path: path.join(__dirname, 'api'),
    baseUrl: '/api'
  },

  maxAge: 1000 * 60 * 30,

  models: {
    path: path.join(__dirname, 'models')
  },

  injectState: ({ req }) => ({
    app: {
      usuario: req.session.usuario,
      acessos: req.session.acessos
    }
  })

};

module.exports = Object.assign({}, serverConfig, config.app);