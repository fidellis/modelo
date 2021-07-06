const fs = require('fs-extra');
const path = require('path');

const buildServerFolder = path.join(__dirname, '../server');

console.log('cleaning build server folder...');

fs.removeSync(buildServerFolder);
fs.mkdirSync(buildServerFolder);

