const initialAppState = {
  loading: true,
  config: null
};

const appStateReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'LOAD_APP_CONFIG_FULFILLED':
      return {
        loading: false,
        config: action.payload
      };
    default:
      return state;
  }
};

export default appStateReducer;
