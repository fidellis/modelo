import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';
import filter from './filter';
import table from './table';

export default combineReducers({
  app,
  filter,
  table,
  router,
});
