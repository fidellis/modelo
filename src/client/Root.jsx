import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from '~/store';
import config from '~/config';
import App from './App';
import theme from './theme';

const BASE_URL = `/${config.baseUrl}`;

const Root = () => (
  <Provider store={store}>
    <Router basename={BASE_URL}>
      <MuiThemeProvider theme={theme}>
        <App baseUrl={BASE_URL} />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default Root;
