import sdk from '../core/sdk';

export function getTypes() {
  return {
    type: 'GET_STEP_TYPES',
    payload: sdk.resources.steps.getStepTypes()
  };
}

export function getSteps() {
  return {
    type: 'GET_STEPS',
    payload: sdk.resources.steps.getSteps()
  };
}

export function updateAllSteps(steps) {
  return {
    type: 'UPDATE_ALL_STEPS',
    payload: steps
  };
}
