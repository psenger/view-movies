import {takeLatest} from 'redux-saga/effects';
import call_fetchMovies from '../workers/moviesWorker';
import ACTIONS from '../../actionCreators/actionTypes/index';

/** *********************************************** **/
/** Designed to regulate the frequency of the calls **/
/** *********************************************** **/

/**
 * Watch for Dispatch ACTIONS.MAKE.INITIATE so the saga can be kicked off.
 * The user has requested all the makes
 *
 * takeLatest ask almost like a de-bounce.
 */
export function* fetchMoviesSaga() {
  // takeLatest does not allow concurrent fetches
  yield takeLatest(ACTIONS.MOVIES.INITIATE, call_fetchMovies);
}
