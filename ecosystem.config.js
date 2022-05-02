const package = require('./package.json');

const env = process.env;
const basePath = '/dados/app';
const appPath = `${basePath}/${package.app.path}`;

const HOSTS = [
  env.WS_HOST,
  //'172.16.13.158',
]

function postDeploy(ambiente) {
  return [
    'source ~/.bash_profile',
    'cd server',
    'ls -al',
    `http_proxy=${env.http_proxy} https_proxy=${env.http_proxy} yarn install --production=true`,
    'yarn link common',
    'cd ..',
    'ls -al',
    `pm2 startOrReload ecosystem.config.js --env ${ambiente} --update-env --no-autorestart`,
    // `pm2 logs ${package.app.name} --lines 20 --nostream`,
  ].join(' && ')
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: package.app.name,
      script: './server/index.js',
      instances: 1,
      error_file: `${appPath}/logs/err.log`,
      out_file: `${appPath}/logs/out.log`,
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        AMBIENTE: 'producao',
        DB_USER: env.DB_USER,
        DB_PWD: env.DB_PWD,
      },
      env_staging: {
        AMBIENTE: 'staging',
        DB_USER: env.DB_USER,
        DB_PWD: env.DB_PWD,
        DB_HOST: 'localhost',
      },
    },
    // {
    //   name: package.app.name + '-jobs',
    //   script: './scripts/jobs/index.js',
    //   error_file: `${appPath}/logs/jobs-err.log`,
    //   out_file: `${appPath}/logs/jobs-out.log`,
    //   instances: 1,
    // }

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: env.WS_USER,
      host: HOSTS,
      ref: 'origin/master',
      repo: package.repository.url,
      path: appPath,
      'post-deploy': postDeploy('production'),
    },
    staging: {
      user: env.WS_USER,
      host: env.WS_STAGING_HOST,
      ref: 'origin/staging',
      repo: package.repository.url,
      path: appPath,
      'post-deploy': postDeploy('staging'),
    },
  },
};
