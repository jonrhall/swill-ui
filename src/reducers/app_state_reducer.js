const initialAppState = {
  loading: true,
  config: null,
  menuOpen: false
};

// Update a param in the config list
const updateConfigList = (newParam, state) =>
  Object.assign({}, state, {
    config: state.config.map((param) => {
      if (newParam.name === param.name) {
        return newParam;
      }
      return param;
    })
  });

const appStateReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'LOAD_APP_CONFIG_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        config: action.payload
      });
    case 'SET_CONFIG_VALUE_FULFILLED':
      return updateConfigList(action.payload, state);
    case 'OPEN_MENU':
      return Object.assign({}, state, {
        menuOpen: true
      });
    case 'CLOSE_MENU':
      return Object.assign({}, state, {
        menuOpen: false
      });
    default:
      return state;
  }
};

export default appStateReducer;
