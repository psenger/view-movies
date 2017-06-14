
import ACTIONS from '../actionCreators/actionTypes/index';

let initialState = {movies: [] };

export default function moviesReducer(state = initialState, action) {
  let value = action.value;

  switch (action.type) {

    case ACTIONS.MOVIES.LOAD:
      return Object.assign({}, state, {movies: value});

    default:
      return state
  }
}
