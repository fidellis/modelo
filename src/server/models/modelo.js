import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
  'Modelo',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: Sequelize.STRING(255),
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
    schema: 'teste',
    tableName: 'modelo',
  },
);

Model.afterSync(() => Promise.all([
  Model.upsert({ id: 1, nome: 'Modelo', usuarioInclusao_id: 'F0000000' }),
]));

export default Model;