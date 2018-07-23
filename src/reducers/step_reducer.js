const initialStepState = {
  loadingTypes: false,
  stepTypes: []
};

const stepReducer = (state = initialStepState, action) => {
  switch (action.type) {
    case 'GET_STEP_TYPES_PENDING':
      return Object.assign({}, state, {
        loadingTypes: true
      });
    case 'GET_STEP_TYPES_FULFILLED':
      return Object.assign({}, state, {
        loadingTypes: false,
        stepTypes: action.payload
      });
    default:
      return state;
  }
};

export default stepReducer;
