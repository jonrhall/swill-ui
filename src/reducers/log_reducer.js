const initialLogState = {
  loadingList: false,
  logs: []
};

const logReducer = (state = initialLogState, action) => {
  switch (action.type) {
    case 'GET_LOGS_PENDING':
      return Object.assign({}, state, {
        loadingList: true
      });
    case 'GET_LOGS_FULFILLED':
      return Object.assign({}, state, {
        loadingList: false,
        logs: action.payload
      });
    default:
      return state;
  }
};

export default logReducer;
