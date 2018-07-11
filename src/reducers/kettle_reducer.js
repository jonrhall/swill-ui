const initialKettleState = {
  loadingList: false,
  loadingTypes: false,
  kettles: [],
  types: []
};

// Update an kettle in the kettles list
const updateKettleList = (newKettle, state) =>
  Object.assign({}, state, {
    kettles: state.kettles.map((kettle) => {
      if (newKettle.id === kettle.id) {
        return newKettle;
      }
      return kettle;
    })
  });

const kettleReducer = (state = initialKettleState, action) => {
  switch (action.type) {
    case 'GET_KETTLES_PENDING':
      return Object.assign({}, state, {
        loadingList: true
      });
    case 'GET_KETTLES_FULFILLED':
      return Object.assign({}, state, {
        loadingList: false,
        kettles: action.payload
      });
    case 'GET_KETTLE_TYPES_PENDING':
      return Object.assign({}, state, {
        loadingTypes: true
      });
    case 'GET_KETTLE_TYPES_FULFILLED':
      return Object.assign({}, state, {
        loadingTypes: false,
        types: action.payload
      });
    case 'CREATE_KETTLE_FULFILLED':
      return Object.assign({}, state, {
        kettles: [...state.kettles, action.payload]
      });
    case 'REMOVE_KETTLE_FULFILLED':
      return Object.assign({}, state, {
        kettles: state.kettles.filter(kettle => kettle.id !== action.payload.id)
      });
    case 'EDIT_KETTLE_NAME_FULFILLED':
    case 'EDIT_KETTLE_AGITATOR_FULFILLED':
    case 'EDIT_KETTLE_HEATER_FULFILLED':
    case 'EDIT_KETTLE_SENSOR_FULFILLED':
    case 'EDIT_KETTLE_LOGIC_FULFILLED':
      return updateKettleList(action.payload, state);
    case 'KETTLE_UPDATE':
      return updateKettleList(action.kettle, state);
    default:
      return state;
  }
};

export default kettleReducer;
