import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import initStore from '~/store/init';
import Root from './Root';

if (module.hot) module.hot.accept();

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);

initStore();
