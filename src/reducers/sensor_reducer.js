const initialSensorState = {
  loadingList: false,
  loadingTypes: false,
  sensors: [],
  types: []
};

// Update a sensor in the sensors list
const updateSensorList = (newSensor, state) =>
  Object.assign({}, state, {
    sensors: state.sensors.map((sensor) => {
      if (newSensor.id === sensor.id) {
        return newSensor;
      }
      return sensor;
    })
  });

const sensorReducer = (state = initialSensorState, action) => {
  switch (action.type) {
    case 'GET_SENSORS_PENDING':
      return Object.assign({}, state, {
        loadingList: true
      });
    case 'GET_SENSORS_FULFILLED':
      return Object.assign({}, state, {
        loadingList: false,
        sensors: action.payload
      });
    case 'GET_SENSOR_TYPES_PENDING':
      return Object.assign({}, state, {
        loadingTypes: true
      });
    case 'GET_SENSOR_TYPES_FULFILLED':
      return Object.assign({}, state, {
        loadingTypes: false,
        types: action.payload
      });
    case 'CREATE_SENSOR_FULFILLED':
      return Object.assign({}, state, {
        sensors: [...state.sensors, action.payload]
      });
    case 'REMOVE_SENSOR_FULFILLED':
      return Object.assign({}, state, {
        sensors: state.sensors.filter(sensor => sensor.id !== action.payload.id)
      });
    case 'EDIT_SENSOR_NAME_FULFILLED':
    case 'EDIT_SENSOR_TYPE_FULFILLED':
      return updateSensorList(action.payload, state);
    case 'SENSOR_UPDATE':
      return updateSensorList(action.sensor, state);
    default:
      return state;
  }
};

export default sensorReducer;
