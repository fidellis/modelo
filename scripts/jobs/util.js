const sequelize = require('common/sequelize');
const load = require('common/sequelize/load');
const logger = require('common/logger');
const associate = require('common/sequelize/associate');
const path = require('path');

const commonModelsPath = path.join(path.dirname(require.resolve('common')), 'models');
const modelsPath = path.join(__dirname, '../../server/models');

const Util = {
  async initModels() {
    if (sequelize.__modelsInitialized) return;
    load(commonModelsPath);
    load(modelsPath);
    associate(sequelize);
    await sequelize.sync();
    sequelize.__modelsInitialized = true;
    logger.info('Models initialized!');
  },
};

module.exports = Util;
