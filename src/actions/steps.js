import sdk from '../core/sdk';

export function editSteps(editMode) {
  return {
    type: 'EDIT_STEPS',
    editMode
  };
}

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

export function previousStep(stepId) {
  return {
    type: 'PREVIOUS_STEP',
    payload: async () => {
      // Utility function passed to socketClient to determine the current step before proceeding.
      const findCurrentStep = resolve => (steps) => {
        resolve(steps.find(step => step.state === 'A'));
      };

      const step = async (func) => {
        const sdkOnce = new Promise(res => sdk.socketClient.once('UPDATE_ALL_STEPS', findCurrentStep(res)));
        await func();
        return sdkOnce;
      };

      await step(sdk.resources.steps.resetSteps);
      let currentStep = await step(sdk.resources.steps.startSteps);

      while (currentStep && currentStep.id !== stepId) {
        currentStep =
          await step(sdk.resources.steps.nextStep); // eslint-disable-line no-await-in-loop
      }
    }
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
