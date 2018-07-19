const initialPluginState = {
  loadingList: false,
  plugins: []
};

const updateState = (state, newState) => Object.assign({}, state, newState);

const editPlugin = (list, name, update) =>
  list.map(p => ((p.name === name) ? Object.assign({}, p, update) : p));

const pluginReducer = (state = initialPluginState, action) => {
  switch (action.type) {
    case 'GET_PLUGINS_PENDING':
      return updateState(state, { loadingList: true });
    case 'GET_PLUGINS_FULFILLED':
      return updateState(state, {
        loadingList: false,
        plugins: action.payload.map(p => Object.assign({}, p, { installing: false }))
      });
    case 'INSTALL_PLUGIN_PENDING':
      return updateState(state, {
        plugins: editPlugin(
          state.plugins,
          action.meta.name,
          { installing: true }
        )
      });
    case 'INSTALL_PLUGIN_FULFILLED':
      return updateState(state, {
        plugins: editPlugin(
          state.plugins,
          action.payload.name,
          { installing: false, installed: true }
        )
      });
    case 'DELETE_PLUGIN_FULFILLED':
      return updateState(state, {
        plugins: editPlugin(
          state.plugins,
          action.payload.name,
          { installed: false }
        )
      });
    default:
      return state;
  }
};

export default pluginReducer;
