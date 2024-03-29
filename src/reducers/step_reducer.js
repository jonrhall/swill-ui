const initialStepState = {
  loadingTypes: false,
  stepTypes: [],
  loadingList: false,
  steps: [],
  editing: false
};

const stepReducer = (state = initialStepState, action) => {
  switch (action.type) {
    case 'EDIT_STEPS':
      return Object.assign({}, state, {
        editing: action.editMode
      });
    case 'GET_STEP_TYPES_PENDING':
      return Object.assign({}, state, {
        loadingTypes: true
      });
    case 'GET_STEP_TYPES_FULFILLED':
      return Object.assign({}, state, {
        loadingTypes: false,
        stepTypes: action.payload
      });
    case 'GET_STEPS_PENDING':
      return Object.assign({}, state, {
        loadingList: true
      });
    case 'UPDATE_ALL_STEPS':
    case 'GET_STEPS_FULFILLED':
      return Object.assign({}, state, {
        loadingList: false,
        steps: action.payload
      });
    default:
      return state;
  }
};

export default stepReducer;
