import sdk from '../core/sdk';

// eslint-disable-next-line
export function getTypes() {
  return {
    type: 'GET_STEP_TYPES',
    payload: sdk.resources.steps.getStepTypes()
  };
}
