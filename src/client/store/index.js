import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';


const isDev = process.env.NODE_ENV !== 'production';

let middleWares;

if (isDev) {
  const loggerMiddleware = createLogger();

  const backendErrorMiddleware = () => next => (action) => {
    if (/FAILURE$/.test(action.type)) {
      if (action.error && action.error.html) {
        console.log('3', action)
        const error = `<span>${action.error.html.split('<br/>').join('<br/><span>')}`;
        const errorString = error.replace(/&nbsp;/g, ' ').replace(/<br\/>/g, '\n').replace(/<span>/g, '');
        console.error(errorString);
        // alert(error);
      }
    }

    return next(action);
  };

  middleWares = compose(applyMiddleware(thunkMiddleware, /* loggerMiddleware, */ backendErrorMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f);
} else {
  middleWares = applyMiddleware(thunkMiddleware);
}

const store = createStore(
  reducers,
  middleWares,
);


if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(() => {
    // eslint-disable-next-line
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}


export default store;
