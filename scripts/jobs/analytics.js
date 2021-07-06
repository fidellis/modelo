const createAnalytics = require('../../server/lib/createAnalytics').default;
const sequelize = require('common/sequelize');
const toJson = require('common/util/toJson');

const modelsFileName = [];


const Job = {
  time: '0 5 * * 6',
  name: 'Analytics',
  enabled: false,
  async execute() {
    modelsFileName.forEach(async (fileName) => {
      const Model = require(`../../server/models/${fileName}`).default;
      console.log('Model', Model);
      const AnalyticsModel = createAnalytics(Model);
      // console.log('analyticsModel', AnalyticsModel.sync);
      await AnalyticsModel.sync();
      const instances = await Model.findAll();
      await sequelize.transaction((transaction) => {
        const analyticsPromises = instances.map((instance) => {
          const analyticsInstance = AnalyticsModel.build(toJson(instance));
          return analyticsInstance.save({ transaction });
        });
        return Promise.all(analyticsPromises);
      });
    });
  },
};

module.exports = Job;
