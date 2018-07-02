import sdk from '../core/sdk';

export function getActors() {
  return {
    type: 'GET_ACTORS',
    payload: sdk.resources.actors.getActors()
  };
}

export function getActorTypes() {
  return {
    type: 'GET_ACTOR_TYPES',
    payload: sdk.resources.actors.getActorTypes()
  };
}

export async function switchActorOff(actor) {
  return sdk.resources.actors.modifyActor({ ...actor, state: 0 });
}

export async function switchActorOn(actor) {
  return sdk.resources.actors.modifyActor({ ...actor, state: 1 });
}

export function editActorName(actor, name) {
  return {
    type: 'EDIT_ACTOR_NAME',
    payload: sdk.resources.actors.modifyActor({ ...actor, name })
  };
}

export function editActorPower(actor, power) {
  return sdk.resources.actors.modifyActor({ ...actor, power });
}

export function editActorType(actor, type, config) {
  return {
    type: 'EDIT_ACTOR_TYPE',
    payload: sdk.resources.actors.modifyActor({ ...actor, type, config })
  };
}

export function actorUpdate(actor) {
  return {
    type: 'ACTOR_UPDATE',
    actor
  };
}

export function createActor() {
  return {
    type: 'CREATE_ACTOR',
    payload: sdk.resources.actors.createActor()
  };
}

export function removeActor(actor) {
  return {
    type: 'REMOVE_ACTOR',
    id: actor.id,
    payload: sdk.resources.actors.deleteActor(actor)
  };
}

export function loadAppConfig() {
  return {
    type: 'LOAD_APP_CONFIG',
    payload: sdk.config.getConfig()
  };
}

export function openMenu() {
  return {
    type: 'OPEN_MENU'
  };
}

export function closeMenu() {
  return {
    type: 'CLOSE_MENU'
  };
}

export function connectSdk(dispatch) {
  sdk.resources.actors.onUpdate((event, actor) => {
    if (event === 'SWITCH_ACTOR') {
      dispatch(actorUpdate(actor));
    }
  });
}
