import sdk from '../core/sdk';

export function getFermenters() {
  return {
    type: 'GET_FERMENTERS',
    payload: sdk.resources.fermenters.getFermenters()
  };
}

export function getFermenterTypes() {
  return {
    type: 'GET_FERMENTER_TYPES',
    payload: sdk.resources.fermenters.getFermenterTypes()
  };
}

export async function switchFermenterOff(fermenter) {
  return sdk.resources.fermenters.modifyFermenter({ ...fermenter, state: false });
}

export async function switchFermenterOn(fermenter) {
  return sdk.resources.fermenters.modifyFermenter({ ...fermenter, state: true });
}

export function editFermenterName(fermenter, name) {
  return {
    type: 'EDIT_FERMENTER_NAME',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, name })
  };
}

export function editFermenterLogic(fermenter, logic, config) {
  return {
    type: 'EDIT_FERMENTER_LOGIC',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, logic, config })
  };
}

export function editFermenterCooler(fermenter, cooler) {
  return {
    type: 'EDIT_FERMENTER_COOLER',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, cooler })
  };
}

export function editFermenterHeater(fermenter, heater) {
  return {
    type: 'EDIT_FERMENTER_HEATER',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, heater })
  };
}

export function editFermenterSensor1(fermenter, sensor) {
  return {
    type: 'EDIT_FERMENTER_SENSOR',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, sensor })
  };
}

export function editFermenterSensor2(fermenter, sensor2) {
  return {
    type: 'EDIT_FERMENTER_SENSOR',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, sensor2 })
  };
}

export function editFermenterSensor3(fermenter, sensor3) {
  return {
    type: 'EDIT_FERMENTER_SENSOR',
    payload: sdk.resources.fermenters.modifyFermenter({ ...fermenter, sensor3 })
  };
}

export function fermenterUpdate(fermenter) {
  return {
    type: 'FERMENTER_UPDATE',
    fermenter
  };
}

export function createFermenter() {
  return {
    type: 'CREATE_FERMENTER',
    payload: sdk.resources.fermenters.createFermenter()
  };
}

export function removeFermenter(fermenter) {
  return {
    type: 'REMOVE_FERMENTER',
    id: fermenter.id,
    payload: sdk.resources.fermenters.deleteFermenter(fermenter)
  };
}
