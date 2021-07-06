import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';

export default combineReducers({
  app,
  router,
});
