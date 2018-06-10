import { combineReducers } from 'redux';
import actors from './actor_reducer';
import appState from './app_state_reducer';
import kettles from './kettle_reducer';

export default combineReducers({
  actors,
  appState,
  kettles
});
