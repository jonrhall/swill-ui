const initialActorState = {
  loading: false,
  actors: []
};

const updateActorList = (newActor, state) =>
  Object.assign({}, state, {
    // Update the actor in the actors list
    actors: state.actors.map((actor) => {
      if (newActor.id === actor.id) {
        // setState is a prototype method on the resource, it won't be returned in an API request.
        newActor.setState = actor.setState; // eslint-disable-line
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
      return {
        loading: false,
        actors: action.payload
      };
    case 'ACTOR_UPDATE':
      return updateActorList(action.actor, state);
    default:
      return state;
  }
};

export default actorReducer;
