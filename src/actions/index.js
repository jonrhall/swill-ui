import sdk from '../core/sdk';

export function getActors() {
  return {
    type: 'GET_ACTORS',
    payload: sdk.resources.actors.getActors()
  };
}

export function getKettles() {
  return {
    type: 'GET_KETTLES',
    payload: sdk.resources.actors.getActors()
  };
}
