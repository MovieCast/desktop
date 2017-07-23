import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import AppToolbar from './AppToolbar';

const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark',
  }),
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppToolbar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};
