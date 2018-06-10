import sdk from '../core/sdk';

export function getActors() {
  return {
    type: 'GET_ACTORS',
    payload: sdk.resources.actors.getActors()
  };
}

export function loadAppConfig() {
  return {
    type: 'LOAD_APP_CONFIG',
    payload: sdk.config.getConfig()
  };
}
