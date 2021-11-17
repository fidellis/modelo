'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _version = require('common/sequelize/version');

var _version2 = _interopRequireDefault(_version);

var _tipo = require('./tipo');

var _tipo2 = _interopRequireDefault(_tipo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Teste', {
  id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: _sequelize4.default.STRING(255),
    allowNull: false
  },

  tipo_id: {
    type: _sequelize4.default.BIGINT,
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
  schema: 'teste',
  tableName: 'teste'
});

Model.belongsTo(_tipo2.default, { as: 'tipo', foreignKey: 'tipo_id' });

const ModelVersion = new _version2.default(Model);
ModelVersion.sync();

exports.default = Model;