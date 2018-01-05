import { remote } from 'electron';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Minimize from '../App/Icons/Minimize';
import Maximize from '../App/Icons/Maximize';
import Close from '../App/Icons/Close';

import { APP_NAME } from '../../../config';

const styles = theme => ({
  root: {
    WebkitAppRegion: 'drag',
    height: process.platform !== 'darwin' ? 29 : 22, // Sorry for this hack will be fixed later
    width: '100%',
    backgroundColor: theme.palette.primary[700],
    zIndex: 1400,
    position: 'relative'
  },
  rootTransparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)' // Hihi, I lied, it's not 100% transparent :P
  },
  resizeBar: {
    WebkitAppRegion: 'no-drag',
    position: 'absolute',
    height: 3,
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 10,
  },
  title: {
    flexGrow: 1
  },
  controls: {
    height: '100%',
    display: 'flex'
  },
  controlButton: {
    WebkitAppRegion: 'no-drag',
    height: '100%',
    width: 45,
    '&.svg': {
      display: 'block'
    },
    '&:hover': {
      backgroundColor: theme.palette.primary[500]
    }
  }
});

class ViewStatusBar extends Component {
  state = {
    isMaximized: false
  }

  componentWillMount() {
    this.updateState();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateState);
  }

  updateState = () => {
    this.setState({
      isMaximized: remote.getCurrentWindow().isMaximized()
    });
  }

  handleMaximize = () => {
    const window = remote.getCurrentWindow();

    if (this.state.isMaximized) {
      window.unmaximize();
    } else {
      window.maximize();
    }

    this.setState({
      isMaximized: window.isMaximized()
    });
  }

  handleMinimize = () => {
    remote.getCurrentWindow().minimize();
  }

  handleClose = () => {
    remote.getCurrentWindow().close();
  }

  render() {
    const { classes, transparent, visible } = this.props;

    const rootClassName = classNames(classes.root, {
      [classes.rootTransparent]: transparent
    });

    if (visible) {
      return (
        <div className={rootClassName}>
          <div className={classes.resizeBar} />
          {process.platform !== 'darwin' && (
            <div className={classes.wrapper}>
              <div className={classes.title}>
                <Typography>{APP_NAME}</Typography>
              </div>
              <div className={classes.controls}>
                <div role="presentation" onClick={this.handleMinimize} className={classes.controlButton}>
                  <Minimize />
                </div>
                <div role="presentation" onClick={this.handleMaximize} className={classes.controlButton}>
                  <Maximize isMaximized={this.state.isMaximized} />
                </div>
                <div role="presentation" onClick={this.handleClose} className={classes.controlButton}>
                  <Close />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  }
}

/* eslint-disable react/forbid-prop-types */
ViewStatusBar.propTypes = {
  classes: PropTypes.object.isRequired,
  transparent: PropTypes.bool,
  visible: PropTypes.bool
};
/* eslint-enable react/forbid-prop-types */

ViewStatusBar.defaultProps = {
  transparent: false,
  visible: true
};

export default withStyles(styles)(ViewStatusBar);
