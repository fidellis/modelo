'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _sumario = require('./sumario');

var _sumario2 = _interopRequireDefault(_sumario);

var _backlog = require('./backlog');

var _backlog2 = _interopRequireDefault(_backlog);

var _sistemaResolucao = require('./sistemaResolucao');

var _sistemaResolucao2 = _interopRequireDefault(_sistemaResolucao);

var _usuarioResponsavelResolucao = require('./usuarioResponsavelResolucao');

var _usuarioResponsavelResolucao2 = _interopRequireDefault(_usuarioResponsavelResolucao);

var _tipo = require('./tipo');

var _tipo2 = _interopRequireDefault(_tipo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Resolucao', {
  id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: _sequelize4.default.STRING(255),
    allowNull: false
  },

  numero: {
    type: _sequelize4.default.INTEGER,
    unique: true,
    allowNull: false
  },

  ano: {
    type: _sequelize4.default.INTEGER,
    allowNull: false
  },

  vigencia: {
    type: _sequelize4.default.DATEONLY,
    allowNull: false
  },

  tipo_id: {
    type: _sequelize4.default.INTEGER,
    allowNull: false
  },

  usuarioInclusao_id: {
    type: _sequelize4.default.STRING(9),
    allowNull: false,
    associate: {
      model: 'Usuario'
    }
  },

  dataHoraInclusao: {
    type: _sequelize4.default.DATE,
    allowNull: false,
    defaultValue: _sequelize4.default.NOW
  },

  usuarioAlteracao_id: {
    type: _sequelize4.default.STRING(9),
    allowNull: true,
    associate: {
      model: 'Usuario'
    }
  },
  dataHoraAlteracao: {
    type: _sequelize4.default.DATE,
    allowNull: true
  }
}, {
  scopes: {
    sumario: () => ({
      include: [{
        model: _sumario2.default,
        as: 'sumario'
      }],
      order: [[{ model: _sumario2.default, as: 'sumario' }, 'ordem'], [{ model: _sumario2.default, as: 'sumario' }, 'item']]
    }),
    backlog: () => ({
      include: [{
        model: _backlog2.default.scope('statusSistemaBacklog', 'uors'),
        as: 'backlog'
      }],
      order: [[{ model: _backlog2.default, as: 'backlog' }, 'ordem'], [{ model: _backlog2.default, as: 'backlog' }, 'item']]
    }),
    sistemas: () => ({
      include: [{
        model: _sistemaResolucao2.default.scope('sistema'),
        as: 'sistemas'
      }]
    }),
    responsaveis: () => ({
      include: [{
        model: _usuarioResponsavelResolucao2.default.scope(['tipo', 'responsavel']),
        as: 'responsaveis'
      }],
      order: [[{ model: _usuarioResponsavelResolucao2.default, as: 'responsaveis' }, 'responsavel_id']]
    }),
    tipo: () => ({
      include: [{
        model: _tipo2.default,
        as: 'tipo'
      }]
    })
  },
  schema: 'resolucoes_bacen',
  tableName: 'resolucao'
});

Model.hasMany(_backlog2.default, { as: 'backlog', foreignKey: 'resolucao_id', onDelete: 'cascade' });
_backlog2.default.belongsTo(Model, { as: 'resolucao', foreignKey: 'resolucao_id' });
Model.hasMany(_sumario2.default, { as: 'sumario', foreignKey: 'resolucao_id', onDelete: 'cascade' });
_sumario2.default.belongsTo(Model, { as: 'sumario', foreignKey: 'resolucao_id' });
Model.hasMany(_sistemaResolucao2.default, { as: 'sistemas', foreignKey: 'resolucao_id', onDelete: 'cascade' });
Model.hasMany(_usuarioResponsavelResolucao2.default, { as: 'responsaveis', foreignKey: 'resolucao_id', onDelete: 'cascade' });
Model.belongsTo(_tipo2.default, { as: 'tipo', foreignKey: 'tipo_id' });

exports.default = Model;