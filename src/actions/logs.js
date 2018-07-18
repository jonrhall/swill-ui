import sdk from '../core/sdk';

export function getLogs() {
  return {
    type: 'GET_LOGS',
    payload: sdk.resources.logs.getLogs()
  };
}

export function deleteLog(logName) {
  return {
    type: 'DELETE_LOG',
    payload: sdk.resources.logs.deleteLog(logName)
  };
}
