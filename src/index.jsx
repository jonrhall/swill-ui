/* eslint-disable */
// Ignore ESLint rules in this file because there's all sorts of weird initialization.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import App from './core/App';
import store from './core/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById("app")
);
