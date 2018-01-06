export default function createWaiterMiddleware() {
  const pendingActions = [];

  const middleware = () => next => action => {
    for (let i = 0; i < pendingActions.length; i += 1) {
      const pendingAction = pendingActions[i];

      if (pendingAction.isSuccessAction(action)) {
        pendingAction.resolve(pendingAction.successCallback(action));
        pendingActions.splice(pendingActions.indexOf(pendingAction), 1);
      } else if (pendingAction.isErrorAction(action)) {
        pendingAction.reject(pendingAction.errorCallback(action));
        pendingActions.splice(pendingActions.indexOf(pendingAction), 1);
      }
    }

    const {
      waitAction,
      errorAction
    } = action;

    if (!waitAction) {
      return next(action);
    }

    const newPendingAction = new PendingAction();
    newPendingAction.setSuccessAction(waitAction);

    if (errorAction) {
      newPendingAction.setErrorAction(errorAction);
    }

    const promise = new Promise((resolve, reject) => {
      newPendingAction.bindResolve(resolve);
      newPendingAction.bindReject(reject);
    });

    pendingActions.push(newPendingAction);

    next(action);

    console.log(promise);

    return promise;
  };

  return middleware;
}

class PendingAction {
  resolve = null;
  reject = null;

  isSuccessAction = null;
  isErrorAction = () => false;

  successCallback = action => action.payload || action.data || {};
  errorCallback = action => action.error || action.err || new Error('action.error not specified.');

  /**
   * Binds a Promise.resolve to
   * this pending action
   * @param {function} resolve
   */
  bindResolve(resolve) {
    this.resolve = resolve;
  }

  /**
   * Binds a Promise.reject to
   * this pending action
   * @param {function} reject
   */
  bindReject(reject) {
    this.reject = reject;
  }

  /**
   * Set the success action of
   * this pending action
   * @param {string|function} actionOrType
   */
  setSuccessAction(actionOrType) {
    if (typeof actionOrType === 'function') {
      this.isSuccessAction = actionOrType;
    } else {
      this.isSuccessAction = action => action.type === actionOrType;
    }
  }

  /**
   * Set the error action of
   * this pending action
   * @param {string|function} actionOrType
   */
  setErrorAction(actionOrType) {
    if (typeof actionOrType === 'function') {
      this.isErrorAction = actionOrType;
    } else {
      this.isErrorAction = action => action.type === actionOrType;
    }
  }
}
