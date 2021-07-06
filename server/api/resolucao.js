'use strict';

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

async function save({ body, usuario }) {

    const { Resolucao, UsuarioResponsavelResolucao } = _sequelize2.default.models;
    const { uors } = body,
          data = _objectWithoutProperties(body, ['uors']);
    const isNewRecord = !data.id;

    if (isNewRecord) {
        data.usuarioInclusao_id = usuario.id;
    } else {
        data.usuarioAlteracao_id = usuario.id;
        data.dataHoraAlteracao = new Date();
    }

    const resolucao = await Resolucao.build(data, { isNewRecord }).save();

    if (isNewRecord) {
        await UsuarioResponsavelResolucao.build({ resolucao_id: resolucao.id, responsavel_id: usuario.id, usuarioInclusao_id: usuario.id }, { isNewRecord: true }).save();
    }

    return resolucao;
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
    router.get('/pesquisa', async (req, res, next) => {
        const { Resolucao, TipoResolucao, UsuarioResponsavelResolucao, Backlog, UorResponsavelAcao } = _sequelize2.default.models;
        const { responsavel_id, uor_id } = req.query;
        const whereResponsavel = responsavel_id ? ` "responsaveis"."responsavel_id" in(${responsavel_id})` : '1=1';
        const whereUor = uor_id ? ` "backlog->uors->uor"."id" in(${uor_id.join(',')})` : '1=1';
        //
        try {
            const response = await Resolucao.findAll({
                // where : sequelize.literal(` ${whereResponsavel} and ${whereUor} `),

                attributes: ['id', 'nome', 'numero', 'ano', 'usuarioInclusao_id'],
                include: [{
                    model: TipoResolucao,
                    as: 'tipo',
                    attributes: ['nome']
                }, {
                    model: UsuarioResponsavelResolucao.scope(['tipo', 'responsavel']),
                    as: 'responsaveis',
                    attributes: ['responsavel_id'],
                    where: responsavel_id ? { responsavel_id } : null
                }, {
                    model: Backlog,
                    as: 'backlog',
                    attributes: ['id'],
                    subQuery: false,
                    include: [{
                        model: UorResponsavelAcao,
                        as: 'uors',
                        attributes: ['backlog_id', 'uor_id', 'tipo_id'],
                        // where: uor_id ? { uor_id } : null,
                        subQuery: false
                    }]
                }],
                where: uor_id ? _sequelize2.default.literal(` "backlog->uors"."uor_id" in(${uor_id})`) : null,
                order: [[{ model: UsuarioResponsavelResolucao, as: 'responsaveis' }, 'responsavel_id']]
            });
            res.send(response);
        } catch (err) {
            next(err);
        }
    });
};