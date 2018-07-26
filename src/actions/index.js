import sdk from '../core/sdk';
import * as actors from './actors';
import * as fermenters from './fermenters';
import * as kettles from './kettles';
import * as logs from './logs';
import * as plugins from './plugins';
import * as sensors from './sensors';
import * as steps from './steps';

export function openMenu() {
  return {
    type: 'OPEN_MENU'
  };
}

export function closeMenu() {
  return {
    type: 'CLOSE_MENU'
  };
}

export function connectSdk(dispatch) {
  sdk.resources.actors.onUpdate((event, actor) => {
    if (event === 'SWITCH_ACTOR') {
      dispatch(actors.actorUpdate(actor));
    }
  });

  sdk.resources.kettles.onUpdate((event, kettle) => {
    if (event === 'UPDATE_KETTLE') {
      dispatch(kettles.kettleUpdate(kettle));
    }

    if (event === 'UPDATE_KETTLE_TARGET_TEMP') {
      dispatch(kettles.updateKettleTemp(kettle));
    }
  });

  sdk.resources.steps.onUpdate((event, data) => {
    if (event === 'UPDATE_ALL_STEPS') {
      dispatch(steps.updateAllSteps(data));
    }
  });
}

export default {
  actors,
  fermenters,
  kettles,
  logs,
  plugins,
  sensors,
  steps
};
