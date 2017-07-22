import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationFullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import * as ElectronActions from '../actions/electron';

class OsControls extends Component {
  renderMaximizeButton() {
    return this.props.maximized ? <NavigationFullscreenExit /> : <NavigationFullscreen />;
  }

  render() {
    return (
      <div>
        <IconButton onClick={() => this.props.minimize()}><ContentRemove /></IconButton>
        <IconButton onClick={() => this.props.maximize()}>{this.renderMaximizeButton()}</IconButton>
        <IconButton onClick={() => this.props.close()}><NavigationClose /></IconButton>
      </div>
    );
  }
}

OsControls.propTypes = {
  maximized: PropTypes.bool.isRequired,
  minimize: PropTypes.func.isRequired,
  maximize: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

function mapStateToProps({ electron }) {
  return { maximized: electron.maximized };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ElectronActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OsControls);
