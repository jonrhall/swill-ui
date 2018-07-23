import sdk from '../core/sdk';

export function loadAppConfig() {
  return {
    type: 'LOAD_APP_CONFIG',
    payload: sdk.config.getConfig()
  };
}

export function setValue(param, value) {
  return {
    type: 'SET_CONFIG_VALUE',
    payload: sdk.config.setValue(param, value)
  };
}
