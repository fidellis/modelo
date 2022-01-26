'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Situacao', {
    cnpj: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    situacao: {
        type: _sequelize4.default.STRING
    },

    dataSituacao: {
        type: _sequelize4.default.STRING
    }
}, {
    schema: 'teste',
    tableName: 'situacao'
});
Model.sync();
exports.default = Model;