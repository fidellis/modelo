const path = require('path');
const modulePath = require('app-module-path');

modulePath.addPath(path.join(__dirname, '../'));
modulePath.addPath(path.join(__dirname, '../server'));

Error.stackTraceLimit = 30;

