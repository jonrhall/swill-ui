import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from '../reducers';

export default createStore(reducers, {}, applyMiddleware(
  promiseMiddleware(),
  loggerMiddleware
));
