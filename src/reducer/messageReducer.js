import ACTIONS from "../actionCreators/actionTypes/index";

const initialState = {message: null, isError: false, inFlight: false};

export default function messageReducer(state = initialState, action) {
  let value = action.value;

  switch (action.type) {

    case ACTIONS.MESSAGE.SAVE:
      return Object.assign({}, state, {
        message: value
      });

    case ACTIONS.MESSAGE.IS_ERROR:
      return Object.assign({}, state, {
        isError: value
      });

    case ACTIONS.MESSAGE.IN_FLIGHT:
      return Object.assign({}, state, {
        inFlight: value
      });

    default:
      return state;
  }
}
