'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _uor = require('common/models/uor/uor');

var _uor2 = _interopRequireDefault(_uor);

var _tipoResponsavel = require('./tipoResponsavel');

var _tipoResponsavel2 = _interopRequireDefault(_tipoResponsavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('UorResponsavelAcao', {
  backlog_id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    allowNull: false
  },

  uor_id: {
    type: _sequelize4.default.INTEGER,
    primaryKey: true,
    allowNull: false,
    associate: {
      model: 'UOR'
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
  // defaultScope: {
  //     order: ['uor_id']
  // },
  scopes: {
    tipo: {
      include: [{
        model: _tipoResponsavel2.default,
        as: 'tipo'
      }]

    },
    uor: {
      include: [{
        model: _uor2.default.scope('gediv'),
        as: 'uor',
        attributes: ['nome']
      }]

    },
    filtroResponsavel: {
      include: [{
        model: _uor2.default,
        as: 'uor',
        attributes: ['nome']
      }],
      attributes: ['uor_id'],
      group: ['uor_id', 'id', 'nome']
    }
  },
  schema: 'resolucoes_bacen',
  tableName: 'uor_responsavel_acao'
});

Model.belongsTo(_tipoResponsavel2.default, { as: 'tipo', foreignKey: 'tipo_id' });

exports.default = Model;