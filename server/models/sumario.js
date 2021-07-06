'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Sumario', {
  id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  resolucao_id: {
    type: _sequelize4.default.BIGINT,
    allowNull: false
  },

  item: {
    type: _sequelize4.default.STRING(255),
    allowNull: false
  },

  descricao: {
    type: _sequelize4.default.TEXT,
    allowNull: false
  },

  descricaoHtml: {
    type: _sequelize4.default.TEXT,
    allowNull: false
  },

  descricaoPureHtml: {
    type: _sequelize4.default.TEXT,
    allowNull: false
  },

  prazo: {
    type: _sequelize4.default.DATEONLY,
    allowNull: true
  },

  ordem: {
    type: _sequelize4.default.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  anexo_id: {
    type: _sequelize4.default.INTEGER,
    allowNull: true
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
  defaultScope: {
    order: ['ordem']
  },
  schema: 'resolucoes_bacen',
  tableName: 'sumario'
});

exports.default = Model;