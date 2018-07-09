import sdk from '../core/sdk';

export function getSensors() {
  return {
    type: 'GET_SENSORS',
    payload: sdk.resources.sensors.getSensors()
  };
}

export function getSensorTypes() {
  return {
    type: 'GET_SENSOR_TYPES',
    payload: sdk.resources.sensors.getSensorTypes()
  };
}

export function editSensorName(sensor, name) {
  return {
    type: 'EDIT_SENSOR_NAME',
    payload: sdk.resources.sensors.modifySensor({ ...sensor, name })
  };
}

export function editSensorType(sensor, type, config) {
  return {
    type: 'EDIT_SENSOR_TYPE',
    payload: sdk.resources.sensors.modifySensor({ ...sensor, type, config })
  };
}

export function sensorUpdate(sensor) {
  return {
    type: 'SENSOR_UPDATE',
    sensor
  };
}

export function createSensor() {
  return {
    type: 'CREATE_SENSOR',
    payload: sdk.resources.sensors.createSensor()
  };
}

export function removeSensor(sensor) {
  return {
    type: 'REMOVE_SENSOR',
    id: sensor.id,
    payload: sdk.resources.sensors.deleteSensor(sensor)
  };
}
