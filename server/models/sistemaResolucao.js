'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _sistema = require('./sistema');

var _sistema2 = _interopRequireDefault(_sistema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('SistemaResolucao', {
  id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  resolucao_id: {
    type: _sequelize4.default.BIGINT,
    allowNull: false
  },

  sistema_id: {
    type: _sequelize4.default.BIGINT,
    allowNull: false
  }
}, {
  indexes: [{
    unique: true,
    fields: ["resolucao_id", "sistema_id"]
  }],
  scopes: {
    sistema: {
      include: [{
        model: _sistema2.default,
        as: 'sistema'
      }]
    }
  },
  schema: 'resolucoes_bacen',
  tableName: 'sistema_resolucao'
});
// import StatusSistemaBacklog from './statusSistemaBacklog';


Model.belongsTo(_sistema2.default, { as: 'sistema', foreignKey: 'sistema_id' });

exports.default = Model;