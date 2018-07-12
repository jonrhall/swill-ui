const initialFermenterState = {
  loadingList: false,
  loadingTypes: false,
  fermenters: [],
  types: []
};

// Update an fermenter in the fermenters list
const updateFermenterList = (newFermenter, state) =>
  Object.assign({}, state, {
    fermenters: state.fermenters.map((fermenter) => {
      if (newFermenter.id === fermenter.id) {
        return newFermenter;
      }
      return fermenter;
    })
  });

const fermenterReducer = (state = initialFermenterState, action) => {
  switch (action.type) {
    case 'GET_FERMENTERS_PENDING':
      return Object.assign({}, state, {
        loadingList: true
      });
    case 'GET_FERMENTERS_FULFILLED':
      return Object.assign({}, state, {
        loadingList: false,
        fermenters: action.payload
      });
    case 'GET_FERMENTER_TYPES_PENDING':
      return Object.assign({}, state, {
        loadingTypes: true
      });
    case 'GET_FERMENTER_TYPES_FULFILLED':
      return Object.assign({}, state, {
        loadingTypes: false,
        types: action.payload
      });
    case 'CREATE_FERMENTER_FULFILLED':
      return Object.assign({}, state, {
        fermenters: [...state.fermenters, action.payload]
      });
    case 'REMOVE_FERMENTER_FULFILLED':
      return Object.assign({}, state, {
        fermenters: state.fermenters.filter(fermenter => fermenter.id !== action.payload.id)
      });
    case 'EDIT_FERMENTER_NAME_FULFILLED':
    case 'EDIT_FERMENTER_HEATER_FULFILLED':
    case 'EDIT_FERMENTER_COOLER_FULFILLED':
    case 'EDIT_FERMENTER_SENSOR_FULFILLED':
    case 'EDIT_FERMENTER_LOGIC_FULFILLED':
      return updateFermenterList(action.payload, state);
    case 'FERMENTER_UPDATE':
      return updateFermenterList(action.fermenter, state);
    default:
      return state;
  }
};

export default fermenterReducer;
