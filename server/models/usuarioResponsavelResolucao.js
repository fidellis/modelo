'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _usuario = require('common/models/portal/usuario');

var _usuario2 = _interopRequireDefault(_usuario);

var _tipoResponsavel = require('./tipoResponsavel');

var _tipoResponsavel2 = _interopRequireDefault(_tipoResponsavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('UsuarioResponsavelResolucao', {
  resolucao_id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    allowNull: false
  },

  responsavel_id: {
    type: _sequelize4.default.STRING(9),
    primaryKey: true,
    allowNull: false,
    associate: {
      model: 'Usuario'
    }
  },

  tipo_id: {
    type: _sequelize4.default.BIGINT,
    allowNull: false,
    defaultValue: 1
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
  }

}, {
  defaultScope: {
    order: ['responsavel_id']
  },
  scopes: {
    tipo: {
      include: [{
        model: _tipoResponsavel2.default,
        as: 'tipo'
      }]

    },
    responsavel: {
      include: [{
        model: _usuario2.default,
        as: 'responsavel',
        attributes: ['nome', 'uor_id']
      }]

    },
    filtroResponsavel: {
      include: [{
        model: _usuario2.default,
        as: 'responsavel',
        attributes: ['nome']
      }],
      attributes: ['responsavel_id'],
      group: ['responsavel_id', 'id', 'nome']
    }
  },
  schema: 'resolucoes_bacen',
  tableName: 'usuario_responsavel_resolucao'
});

Model.belongsTo(_tipoResponsavel2.default, { as: 'tipo', foreignKey: 'tipo_id' });

exports.default = Model;