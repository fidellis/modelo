'use strict';

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

async function save({ body, usuario }) {
  const { Backlog, UorResponsavelAcao } = _sequelize2.default.models;

  const { uors } = body,
        data = _objectWithoutProperties(body, ['uors']);
  const isNewRecord = !data.id;

  if (isNewRecord) {
    data.usuarioInclusao_id = usuario.id;
  } else {
    data.usuarioAlteracao_id = usuario.id;
    data.dataHoraAlteracao = new Date();
  }

  const backlog = await Backlog.build(data, { isNewRecord }).save();

  if (uors) {
    const promises = await uors.map(uor => UorResponsavelAcao.findOrCreate({ where: { backlog_id: backlog.id, uor_id: uor.uor_id }, defaults: { usuarioInclusao_id: data.usuarioInclusao_id } }));
    await Promise.all(promises);
  }

  return backlog;
}

module.exports = router => {
  router.post('/', async (req, res, next) => {
    try {
      const response = await save({ body: req.body, usuario: req.session.usuario });
      res.send(response);
    } catch (err) {
      next(err);
    }
  });
};