'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webDefault = require('common/sequelize/webDefault');

var _webDefault2 = _interopRequireDefault(_webDefault);

var _sequelize = require('common/sequelize/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _webDefault2.default.define('CCMEI', {
  id: {
    type: _sequelize2.default.BIGINT,
    primaryKey: true,
    field: 'cod'
  },

  cnpj: {
    type: _sequelize2.default.BIGINT,
    field: 'cod_cpf_cgc'
  },

  cnpj8: {
    type: _sequelize2.default.BIGINT,
    field: 'cnpj8'
  }

}, {
  schema: 'ccmei',
  tableName: 'ccmei'
});

exports.default = Model;