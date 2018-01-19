import { remote } from 'electron';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Minimize from './Icons/Minimize';
import Maximize from './Icons/Maximize';
import Close from './Icons/Close';

const styles = theme => ({
  root: {
    WebkitAppRegion: 'drag',
    // position: 'absolute',
    // top: 0,
    height: 29,
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.primary[700],
    zIndex: 1400
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

class AppTitleBar extends Component {
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
    const { classes, application: { appTitleBar } } = this.props;

    const rootClassName = classNames(classes.root, {
      [classes.rootTransparent]: appTitleBar.transparent
    });

    return (
      <div className={rootClassName}>
        <div className={classes.resizeBar} />
        <div className={classes.wrapper}>
          <div className={classes.title}>
            <Typography>MovieCast</Typography>
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
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppTitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(AppTitleBar);
