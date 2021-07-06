'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _statusSistema = require('./statusSistema');

var _statusSistema2 = _interopRequireDefault(_statusSistema);

var _sistemaResolucao = require('./sistemaResolucao');

var _sistemaResolucao2 = _interopRequireDefault(_sistemaResolucao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('StatusSistemaBacklog', {
  // id: {
  //   type: Sequelize.BIGINT,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },

  backlog_id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    allowNull: false
  },

  sistemaResolucao_id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    allowNull: false
  },

  status_id: {
    type: _sequelize4.default.BIGINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  scopes: {
    status: {
      include: [{
        model: _statusSistema2.default,
        as: 'status'
      }]
    },
    sistemaResolucao: {
      include: [{
        model: _sistemaResolucao2.default.scope('sistema'),
        as: 'sistemaResolucao'
      }]
    }
  },
  schema: 'resolucoes_bacen',
  tableName: 'status_sistema_backlog'
});

Model.belongsTo(_statusSistema2.default, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(_sistemaResolucao2.default, { as: 'sistemaResolucao', foreignKey: 'sistemaResolucao_id', onDelete: 'cascade' });

Model.addScope('backlog', () => {
  const { Backlog } = _sequelize2.default.models;
  return {
    include: [{
      model: Backlog.scope('resolucao'),
      as: 'backlog',
      attributes: ['item']
    }]
  };
});

exports.default = Model;