import sdk from '../core/sdk';

export function getPlugins() {
  return {
    type: 'GET_PLUGINS',
    payload: sdk.resources.plugins.getPlugins()
  };
}

export function installPlugin(pluginName) {
  return {
    type: 'INSTALL_PLUGIN',
    payload: sdk.resources.plugins.installPlugin(pluginName),
    meta: {
      name: pluginName
    }
  };
}

export function updatePlugin(pluginName) {
  return {
    type: 'UPDATE_PLUGIN',
    payload: sdk.resources.plugins.updatePlugin(pluginName)
  };
}

export function deletePlugin(pluginName) {
  return {
    type: 'DELETE_PLUGIN',
    payload: sdk.resources.plugins.deletePlugin(pluginName)
  };
}
