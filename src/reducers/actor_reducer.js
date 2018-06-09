const initialActorState = {
  loading: false,
  actors: null
};

const actorReducer = (state = initialActorState, action) => {
  switch (action.type) {
    case 'GET_ACTORS_PENDING':
      return Object.assign({}, state, {
        loading: true,
        actors: null
      });
    case 'GET_ACTORS_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        actors: action.payload
      });
    default:
      return state;
  }
};

export default actorReducer;
