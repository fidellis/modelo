import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import Tipo from './tipo';

const Model = sequelize.define(
  'Teste',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },

    tipo_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },

    usuarioInclusao_id: {
      type: Sequelize.STRING(9),
      allowNull: false,
      associate: {
        model: 'Usuario',
      },
    },

    dataHoraInclusao: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },

    usuarioAlteracao_id: {
      type: Sequelize.STRING(9),
      allowNull: true,
      associate: {
        model: 'Usuario',
      },
    },
    dataHoraAlteracao: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    scopes: {
      usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao' }] },
      tipo: params => ({ include: [{ model: Tipo, as: 'tipo' }] }),
    },
    schema: 'teste',
    tableName: 'teste',
  },
);

Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });

const ModelVersion = new Version(Model);
ModelVersion.sync();

export default Model;