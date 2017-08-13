import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider } from 'material-ui/styles';

import AppRouter from './AppRouter';
import createTheme from '../../helpers/createTheme';

class App extends Component {
  render() {
    const { history, ui } = this.props;
    return (
      <MuiThemeProvider theme={createTheme(ui.palette)}>
        <AppRouter history={history} />
      </MuiThemeProvider>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  history: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default App;
