import { combineReducers } from 'redux';
import actors from './actor_reducer';
import appState from './app_state_reducer';
import kettles from './kettle_reducer';
import fermenters from './fermenter_reducer';
import logs from './log_reducer';
import plugins from './plugin_reducer';
import sensors from './sensor_reducer';

export default combineReducers({
  actors,
  appState,
  kettles,
  fermenters,
  logs,
  plugins,
  sensors
});
