import { combineReducers } from 'redux';
import actors from './actor_reducer';
import appState from './app_state_reducer';
import sensors from './sensor_reducer';
import kettles from './kettle_reducer';
import fermenters from './fermenter_reducer';

export default combineReducers({
  actors,
  appState,
  sensors,
  kettles,
  fermenters
});
