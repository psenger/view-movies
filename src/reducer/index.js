import {combineReducers} from "redux";
import moviesReducer from "./moviesReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  moviesReducer,
  messageReducer
});
