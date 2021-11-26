import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'Periodo',
    {
        cnpj: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        dataInicio: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            primaryKey: true,
        },

        dataFim: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            primaryKey: true,
        },

        detalhamento: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        schema: 'teste',
        tableName: 'periodo',
    },
);
Model.sync();
export default Model;