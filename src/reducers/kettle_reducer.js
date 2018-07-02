const initialKettleState = {
  loading: false,
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
        loading: true
      });
    case 'GET_KETTLES_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        kettles: action.payload
      });
    case 'GET_KETTLE_TYPES_FULFILLED':
      return Object.assign({}, state, {
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
    case 'EDIT_KETTLE_TYPE_FULFILLED':
      return updateKettleList(action.payload, state);
    case 'KETTLE_UPDATE':
      return updateKettleList(action.kettle, state);
    default:
      return state;
  }
};

export default kettleReducer;
