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

var _statusSistemaBacklog = require('./statusSistemaBacklog');

var _statusSistemaBacklog2 = _interopRequireDefault(_statusSistemaBacklog);

var _uorResponsavelAcao = require('./uorResponsavelAcao');

var _uorResponsavelAcao2 = _interopRequireDefault(_uorResponsavelAcao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Backlog', {
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

  // descricaoHtml: {
  //     type: Sequelize.TEXT,
  //     allowNull: false,
  // },

  // descricaoPureHtml: {
  //   type: Sequelize.TEXT,
  //   allowNull: false,
  // },

  prazo: {
    type: _sequelize4.default.DATEONLY,
    allowNull: true
  },

  ordem: {
    type: _sequelize4.default.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  percentual: {
    type: _sequelize4.default.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  observacao: {
    type: _sequelize4.default.TEXT,
    allowNull: true
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
  scopes: {
    statusSistemaBacklog: {
      include: [{
        model: _statusSistemaBacklog2.default.scope('status', 'sistemaResolucao'),
        as: 'statusSistemaBacklog'
      }]
    },
    uors: {
      include: [{
        model: _uorResponsavelAcao2.default.scope('uor'),
        as: 'uors',
        attributes: ['backlog_id', 'uor_id', 'tipo_id']
      }]
    }
  },
  schema: 'resolucoes_bacen',
  tableName: 'backlog'
});

Model.hasMany(_statusSistemaBacklog2.default, { as: 'statusSistemaBacklog', foreignKey: 'backlog_id', onDelete: 'cascade' });
_statusSistemaBacklog2.default.belongsTo(Model, { as: 'backlog', foreignKey: 'backlog_id' });
Model.hasMany(_uorResponsavelAcao2.default, { as: 'uors', foreignKey: 'backlog_id', onDelete: 'cascade' });

Model.addScope('resolucao', () => {
  const { Resolucao } = _sequelize2.default.models;
  return {
    include: [{
      model: Resolucao,
      as: 'resolucao',
      attributes: ['nome', 'numero', 'ano']
    }]
  };
});

const ModelVersion = new _version2.default(Model);
ModelVersion.sync();

exports.default = Model;