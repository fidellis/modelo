import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
  'Tipo',
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

    ativo: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    schema: 'teste',
    tableName: 'tipo',
  },
);

Model.afterSync(() => Promise.all([
  Model.upsert({ id: 1, nome: 'x​' }),
]));

export default Model;