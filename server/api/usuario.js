'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bbAutenticador = require('common/autenticacao/bbAutenticador');

var _bbAutenticador2 = _interopRequireDefault(_bbAutenticador);

var _sessao = require('common/sessao');

var _sessao2 = _interopRequireDefault(_sessao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = router => {
  router.get('/logado', async (req, res, next) => {
    res.send(req.session.usuario);
  });

  router.get('/acessos', (req, res) => {
    res.send(req.session.acessos);
  });

  router.get('/logoff', (req, res) => {
    const usuario = req.session.usuario;
    const url = req.query.url;

    _sessao2.default.logoff(usuario);

    _bbAutenticador2.default.logoff(req, res, url);
  });
};