import React, { Component } from 'react';
// import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import AppRouter from './AppRouter';
import withRoot from './withRoot';

class App extends Component {
  render() {
    const { store, history } = this.props;

    return (
      // <Provider store={store}>
      <AppRouter history={history} />
      // </Provider>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withRoot(App);
