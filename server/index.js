'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _logger = require('common/logger');

var _logger2 = _interopRequireDefault(_logger);

var _create = require('common/app/create');

var _create2 = _interopRequireDefault(_create);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();


console.log('config', _config2.default);

if (process.env.AMBIENTE == 'desenvolvimento') _logger2.default.transports.console.level = 'trace';

const app = (0, _create2.default)(_config2.default);

exports.default = app;