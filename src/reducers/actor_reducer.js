const initialActorState = {
  loading: false,
  actors: [],
  types: []
};

// Update an actor in the actors list
const updateActorList = (newActor, state) =>
  Object.assign({}, state, {
    actors: state.actors.map((actor) => {
      if (newActor.id === actor.id) {
        return newActor;
      }
      return actor;
    })
  });

const actorReducer = (state = initialActorState, action) => {
  switch (action.type) {
    case 'GET_ACTORS_PENDING':
      return Object.assign({}, state, {
        loading: true
      });
    case 'GET_ACTORS_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        actors: action.payload
      });
    case 'GET_ACTOR_TYPES_FULFILLED':
      return Object.assign({}, state, {
        types: action.payload
      });
    case 'CREATE_ACTOR_FULFILLED':
      return Object.assign({}, state, {
        actors: [...state.actors, action.payload]
      });
    case 'REMOVE_ACTOR_FULFILLED':
      return Object.assign({}, state, {
        actors: state.actors.filter(actor => actor.id !== action.payload.id)
      });
    case 'EDIT_ACTOR_NAME_FULFILLED':
    case 'EDIT_ACTOR_TYPE_FULFILLED':
      return updateActorList(action.payload, state);
    case 'ACTOR_UPDATE':
      return updateActorList(action.actor, state);
    default:
      return state;
  }
};

export default actorReducer;
