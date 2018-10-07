import { remote } from 'electron';

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Minimize from './Controls/Minimize';
import Maximize from './Controls/Maximize';
import Close from './Controls/Close';
import ElectronStore from '../../stores/ElectronStore';


const styles = theme => ({
  root: {
    WebkitAppRegion: 'drag',
    height: process.platform !== 'darwin' ? 23 : 22, // Sorry for this hack will be fixed later
    width: '100%',
    backgroundColor: /*'linear-gradient(to right, #3f51b5, #138068)' theme.palette.primary[700]*/ '#002f6c',
    zIndex: 1400,
    position: 'relative',
    transition: theme.transitions.create(['opacity']),
  },
  rootTransparent: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)' // Hihi, I lied, it's not 100% transparent :P (I lied as well, transparency isn't implemented yet! <3)
    backgroundColor: '#223b63', //I'm just too lazy to comment out logic atm
  },
  rootHidden: {
    opacity: 0
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
    flexGrow: 1,
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
      backgroundColor: '#28477a'
    },
    '&:last-of-type': {
      '&:hover': {
        backgroundColor: '#dd3333'        
      }
    }
  },
});

class FrameControls extends Component {
  // componentWillMount() {
  //   this.updateState();
  // }

  // componentDidMount() {
  //   window.addEventListener('resize', this.updateState);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateState);
  // }

  // updateState = () => {
  //   this.setState({
  //     isMaximized: remote.getCurrentWindow().isMaximized(),
  //     isFullScreen: remote.getCurrentWindow().isFullScreen()
  //   });
  // }

  // handleMaximize = () => {
  //   const window = remote.getCurrentWindow();

  //   if (this.state.isMaximized) {
  //     window.unmaximize();
  //   } else {
  //     window.maximize();
  //   }

  //   this.setState({
  //     isMaximized: window.isMaximized()
  //   });
  // }

  // handleMinimize = () => {
  //   remote.getCurrentWindow().minimize();
  // }

  // handleClose = () => {
  //   remote.getCurrentWindow().close();
  // }

  render() {
    const { classes, transparent, visible, electron, minimize, maximize, close } = this.props;

    const rootClassName = classNames(classes.root, {
      [classes.rootTransparent]: transparent,
      [classes.rootHidden]: !visible
    });

    //if (visible) {
      return (
        <div className={rootClassName}>
          <div className={classes.resizeBar} />
            <div className={classes.wrapper}>
              <div className={classes.title}>
                <Typography>{this.props.title}</Typography>
              </div>
              <div className={classes.controls}>
                <div role="presentation" onClick={minimize} className={classes.controlButton}>
                  <Minimize />
                </div>
                <div role="presentation" onClick={maximize} className={classes.controlButton}>
                  <Maximize isMaximized={electron.get('maximized')} />
                </div>
                <div role="presentation" onClick={close} className={classes.controlButton}>
                  <Close />
                </div>
              </div>
            </div>
        </div>
      );
    //}

    //return null;
  }
}

/* eslint-disable react/forbid-prop-types */
FrameControls.propTypes = {
  classes: PropTypes.object.isRequired,
  transparent: PropTypes.bool,
  visible: PropTypes.bool
};
/* eslint-enable react/forbid-prop-types */

FrameControls.defaultProps = {
  transparent: false,
  visible: true
};

export default withStyles(styles)(FrameControls);
