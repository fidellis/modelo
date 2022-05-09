'use strict';

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _converter = require('common/sequelize/params/converter');

var _converter2 = _interopRequireDefault(_converter);

var _teste = require('../../models/teste/teste');

var _teste2 = _interopRequireDefault(_teste);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = router => {
  router.get('/', async (req, res, next) => {
    const params = (0, _converter2.default)(_teste2.default, req);
    try {
      const response = await _teste2.default.scope('usuarioInclusao', 'tipo').findAll(params);
      //.scope({ method: ['tipo', params] })
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/teste/:id', async (req, res, next) => {
    const params = (0, _converter2.default)(_teste2.default, req);
    try {
      const response = await _teste2.default.scope('usuarioInclusao', 'tipo').findById(req.params.id, params);
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { Teste } = _sequelize2.default.models;
    const usuario = req.session.usuario;
    const data = req.body;
    const isNewRecord = !data.id;

    if (isNewRecord) {
      data.usuarioInclusao_id = usuario.id;
    } else {
      data.usuarioAlteracao_id = usuario.id;
      data.dataHoraAlteracao = new Date();
    };

    try {
      let record = await Teste.find({ where: { id: { $notIn: [data.id], nome: data.nome } } });
      if (record) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });

      const response = await Teste.build(data, { isNewRecord }).save();
      res.send(response);
    } catch (err) {
      next(err);
    }
  });
};