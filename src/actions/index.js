import sdk from '../core/sdk';
import * as actors from './actors';
import * as kettles from './kettles';

export function loadAppConfig() {
  return {
    type: 'LOAD_APP_CONFIG',
    payload: sdk.config.getConfig()
  };
}

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
  });
}

export default {
  actors,
  kettles
};
