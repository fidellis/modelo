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
Model.sync();
export default Model;