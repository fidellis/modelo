import sequelize from 'common/sequelize/webDefault';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
  'CCMEI',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      field: 'cod',
    },

    cnpj: {
      type: Sequelize.BIGINT,
      field: 'cod_cpf_cgc',
    },

    cnpj8: {
      type: Sequelize.BIGINT,
      field: 'cnpj8',
    },

  },
  {
    schema: 'ccmei',
    tableName: 'ccmei',
  },
);

export default Model;