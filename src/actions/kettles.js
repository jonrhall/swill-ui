import sdk from '../core/sdk';

export function getKettles() {
  return {
    type: 'GET_KETTLES',
    payload: sdk.resources.kettles.getKettles()
  };
}

export function getKettleTypes() {
  return {
    type: 'GET_KETTLE_TYPES',
    payload: sdk.resources.kettles.getKettleTypes()
  };
}

export async function switchKettleOff(kettle) {
  return sdk.resources.kettles.modifyKettle({ ...kettle, state: false });
}

export async function switchKettleOn(kettle) {
  return sdk.resources.kettles.modifyKettle({ ...kettle, state: true });
}

export function editKettleName(kettle, name) {
  return {
    type: 'EDIT_KETTLE_NAME',
    payload: sdk.resources.kettles.modifyKettle({ ...kettle, name })
  };
}

export function editKettleLogic(kettle, logic, config) {
  return {
    type: 'EDIT_KETTLE_LOGIC',
    payload: sdk.resources.kettles.modifyKettle({ ...kettle, logic, config })
  };
}

export function editKettleAgitator(kettle, agitator) {
  return {
    type: 'EDIT_KETTLE_AGITATOR',
    payload: sdk.resources.kettles.modifyKettle({ ...kettle, agitator })
  };
}

export function editKettleHeater(kettle, heater) {
  return {
    type: 'EDIT_KETTLE_HEATER',
    payload: sdk.resources.kettles.modifyKettle({ ...kettle, heater })
  };
}

export function editKettleSensor(kettle, sensor) {
  return {
    type: 'EDIT_KETTLE_SENSOR',
    payload: sdk.resources.kettles.modifyKettle({ ...kettle, sensor })
  };
}

export function kettleUpdate(kettle) {
  return {
    type: 'KETTLE_UPDATE',
    kettle
  };
}

export function createKettle() {
  return {
    type: 'CREATE_KETTLE',
    payload: sdk.resources.kettles.createKettle()
  };
}

export function removeKettle(kettle) {
  return {
    type: 'REMOVE_KETTLE',
    id: kettle.id,
    payload: sdk.resources.kettles.deleteKettle(kettle)
  };
}
