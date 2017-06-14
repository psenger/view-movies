import {call, put} from "redux-saga/effects";
import {loadData} from "../../actionCreators/moviesActions";
import {saveMessage, setError, setInFlight} from "../../actionCreators/messageActions";
import * as api from "../../services/api";

/** **************** **/
/** Actual API calls **/
/** **************** **/

export default function* call_fetchMovies(action) {
  try {
    yield put(saveMessage('loading'));
    yield put(setError(false));
    yield put(setInFlight(true));
    const payload = yield call(api.fetchMovies, action.value);
    yield put(loadData(payload));
    yield put(saveMessage(null));
  } catch (e) {
    yield put(setError(true));
    yield put(saveMessage(e.message));
  } finally {
    yield put(setInFlight(false));
  }
}
