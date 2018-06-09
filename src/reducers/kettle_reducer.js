const initialKettleState = {
  loading: false,
  kettles: null
};

const kettleReducer = (state = initialKettleState, action) => {
  switch (action.type) {
    case 'LOAD_KETTLES':
      return Object.assign({}, state, {
        loading: true,
        kettles: null
      });
    default:
      return state;
  }
};

export default kettleReducer;
