
import {fork} from 'redux-saga/effects';
import {fetchMoviesSaga} from './watchers/moviesWatcher';

/** ******************************* **/
/** Root Exported Saga, that is run **/
/** ******************************* **/

export default function* rootSaga() {
  yield [
    fork(fetchMoviesSaga)
  ]
}
