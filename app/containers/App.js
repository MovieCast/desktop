import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppToolbar from './AppToolbar';
import AppNavDrawer from '../components/AppNavDrawer';

const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark',
  }),
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navDrawerOpen: false
    };
  }

  handleMenuClick() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleNavDrawerClose() {
    this.setState({
      navDrawerOpen: false
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppToolbar onMenuClick={this.handleMenuClick.bind(this)} />
          <AppNavDrawer
            open={this.state.navDrawerOpen}
            onRequestClose={this.handleNavDrawerClose.bind(this)}
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  children: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */
