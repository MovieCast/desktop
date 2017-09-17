export default function APIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      request,
      shouldRequest = () => true,
      parser = (data) => data,
      payload = {}
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof request !== 'function') {
      throw new Error('Expected request to be a function.');
    }

    if (!shouldRequest(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    );

    return request(getState()).then(
      response =>
        dispatch(
          Object.assign({}, payload, {
            payload: parser(response),
            type: successType
          })
        ),
      error =>
        dispatch(
          Object.assign({}, payload, {
            payload: error,
            type: failureType
          })
        )
    );
  };
}
