import sdk from '../core/sdk';

export function getLogs() {
  return {
    type: 'GET_LOGS',
    payload: sdk.logs.getLogs()
  };
}

export function deleteLog(logName) {
  return {
    type: 'DELETE_LOG',
    payload: sdk.logs.deleteLog(logName)
  };
}
