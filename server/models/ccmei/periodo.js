'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Periodo', {
    cnpj: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    dataInicio: {
        type: _sequelize4.default.DATEONLY,
        allowNull: false,
        primaryKey: true
    },

    dataFim: {
        type: _sequelize4.default.DATEONLY,
        allowNull: true,
        primaryKey: true
    },

    detalhamento: {
        type: _sequelize4.default.STRING,
        allowNull: true
    }
}, {
    schema: 'teste',
    tableName: 'periodo'
});
Model.sync();
exports.default = Model;