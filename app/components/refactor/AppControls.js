import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { IconButton } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {
  Remove as RemoveIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Close as CloseIcon
} from 'material-ui-icons';

import * as ElectronActions from '../../actions/electron';

const styleSheet = createStyleSheet('AppControls', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  appbar: {
    '-webkit-app-region': 'drag'
  },
  button: {
    '-webkit-app-region': 'no-drag'
  }
});

class AppControls extends Component {

  renderMaximizeButton() {
    return this.props.maximized ? <FullscreenExitIcon /> : <FullscreenIcon />;
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <IconButton onClick={() => this.props.minimize()} className={classes.button}>
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={() => this.props.maximize()} className={classes.button}>
          {this.renderMaximizeButton()}
        </IconButton>
        <IconButton onClick={() => this.props.close()} className={classes.button}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppControls.propTypes = {
  classes: PropTypes.object.isRequired,
  maximized: PropTypes.bool.isRequired,
  maximize: PropTypes.func.isRequired,
  minimize: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

function mapStateToProps({ electron }) {
  return { maximized: electron.maximized };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ElectronActions, dispatch);
}

export default withStyles(styleSheet)(connect(mapStateToProps, mapDispatchToProps)(AppControls));
