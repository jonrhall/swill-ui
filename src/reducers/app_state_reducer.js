const initialAppState = {
  loading: true,
  config: null,
  menuOpen: false
};

const appStateReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'LOAD_APP_CONFIG_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        config: action.payload
      });
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
