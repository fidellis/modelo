import dotenv from 'dotenv';

dotenv.config();
import logger from 'common/logger';
import createApp from 'common/app/create';
import config from './config';

console.log('config', config);

if (process.env.AMBIENTE == 'desenvolvimento') logger.transports.console.level = 'trace';

const app = createApp(config);

export default app;
