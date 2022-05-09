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
  Model.upsert({ id: 1, nome: 'Tipo 1​' }),
  Model.upsert({ id: 2, nome: 'Tipo 2' }),
  Model.upsert({ id: 3, nome: 'Tipo 3' }),
]));

export default Model;