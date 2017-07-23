import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {
  Menu as MenuIcon,
  Remove as RemoveIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Close as CloseIcon
} from 'material-ui-icons';

import * as ElectronActions from '../actions/electron';

const styleSheet = createStyleSheet('AppToolbar', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

class AppToolbar extends Component {

  renderMaximizeButton() {
    return this.props.maximized ? <FullscreenExitIcon /> : <FullscreenIcon />;
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              MovieCast
            </Typography>
            <IconButton onClick={() => this.props.minimize()}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => this.props.maximize()}>
              {this.renderMaximizeButton()}
            </IconButton>
            <IconButton onClick={() => this.props.close()}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  maximized: PropTypes.bool.isRequired,
  maximize: PropTypes.func.isRequired,
  minimize: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

function mapStateToProps({ electron }) {
  return { maximized: electron.maximized };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ElectronActions, dispatch);
}

export default withStyles(styleSheet)(connect(mapStateToProps, mapDispatchToProps)(AppToolbar));
