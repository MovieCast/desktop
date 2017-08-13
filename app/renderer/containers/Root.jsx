/**
 * This might be a temp file!
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './App';

function Root({ store, history }) {
  return (
    <Provider store={store}>
      <App history={history} />
    </Provider>
  );
}

/* eslint-disable react/forbid-prop-types */
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default Root;
