const initialActorState = {
  loading: false,
  actors: []
};

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
    default:
      return state;
  }
};

export default actorReducer;
