/**
 * Creates a reducer
 *
 * The reason we use this is actually quite simple, it gives all our reducers
 * a cleaner look.
 * @param {Object} initialState
 * @param {Array} handlers
 */
export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

/**
 * Yea...
 * @param {string} type
 * @param {Array} argNames
 */
export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};
