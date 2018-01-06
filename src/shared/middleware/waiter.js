export default function createWaiterMiddleware() {
  const pendingActions = [];

  // eslint-disable-next-line
  const middleware = store => next => action => {
    // eslint-disable-next-line
    // for (let i = pendingActionList.length - 1; i >= 0; i--) {
    //   const pendingActionInfo = pendingActions[i];
    //   if (pendingActionInfo.isSuccessAction(action)) {
    //     pendingActionInfo.resolveCallback(pendingActionInfo.successArgumentCb(action));
    //   } else if (pendingActionInfo.isErrorAction(action)) {
    //     pendingActionInfo.rejectCallback(pendingActionInfo.errorArgumentCb(action));
    //   }
    //   pendingActions.splice(pendingActions.indexOf(pendingActionInfo), 1);
    // }

    for (let i = 0; i < pendingActions.length; i += 1) {
      const pendingAction = pendingActions[i];

      if (pendingAction.isSuccessAction(action)) {
        pendingAction.resolve(pendingAction.successCallback(action));
      } else if (pendingAction.isErrorAction(action)) {
        pendingAction.reject(pendingAction.errorCallback(action));
      } else {
        continue;
      }

      pendingActions.splice(pendingActions.indexOf(pendingAction), 1);
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
