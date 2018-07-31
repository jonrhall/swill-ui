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

export function nextStep() {
  return {
    type: 'NEXT_STEP',
    payload: sdk.resources.steps.nextStep()
  };
}

export function restartStep() {
  return {
    type: 'RESTART_STEP',
    payload: sdk.resources.steps.resetStep()
  };
}

export function startSteps() {
  return {
    type: 'START_STEPS',
    payload: sdk.resources.steps.startSteps()
  };
}

export function resetSteps() {
  return {
    type: 'RESET_STEPS',
    payload: sdk.resources.steps.resetSteps()
  };
}
