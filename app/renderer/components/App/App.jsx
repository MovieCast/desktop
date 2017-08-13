import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import AppRouter from './AppRouter';
import createTheme from '../../helpers/createTheme';

class App extends Component {
  render() {
    const { store, history, ui } = this.props;
    return (
      <MuiThemeProvider theme={createTheme(ui.palette)}>
        <Provider store={store}>
          <AppRouter history={history} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default App;
