/**
 * Actions are the mechanism you use to communicate with the Dispatcher on the Store.
 *
 * It wraps the data with a type and in this case a value, replicating what we would see in a strongly typed language like Java as an interface.
 *
 * Lessons Learned:
 *   1.) Never make your action form the data for a reducer in an expected shape. Because this creates tight coupling ( an Anti-Pattern )
 *   2.) Consistence wins, use one convention and stick with it. For example, the action specification does not require a 'value:*' but rather '*'. This creates deviations and can expand complexity for maintenance and refactoring.
 */
import ACTIONS from './actionTypes/index';

/**
 * save the message
 * @function
 * @param {string|null} msg - message to save
 */
export const saveMessage = msg => ({
  type: ACTIONS.MESSAGE.SAVE,
  value: msg
});

/**
 * Set the error flag.
 * @function
 * @param {boolean} isError - true or false.
 */
export const setError = (isError) => ({
  type: ACTIONS.MESSAGE.IS_ERROR,
  value: isError
});

/**
 * Set the in flight flag.
 * @function
 * @param {boolean} inFlight - true or false.
 */
export const setInFlight = (inFlight) => ({
  type: ACTIONS.MESSAGE.IN_FLIGHT,
  value: inFlight
});