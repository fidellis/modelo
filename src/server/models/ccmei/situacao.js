import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'Situacao',
    {
        cnpj: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        situacao: {
            type: Sequelize.STRING,
        },
    },
    {
        schema: 'teste',
        tableName: 'situacao',
    },
);

export default Model;