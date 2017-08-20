import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider } from 'material-ui/styles';
import createTheme from '../../helpers/createTheme';

class AppUI extends Component {
  render() {
    const { ui } = this.props;
    return (
      <MuiThemeProvider theme={createTheme(ui.palette)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppUI.propTypes = {
  ui: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default AppUI;
