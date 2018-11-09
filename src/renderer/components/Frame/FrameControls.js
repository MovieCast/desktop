import { remote } from 'electron';

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Minimize from './Controls/Minimize';
import Maximize from './Controls/Maximize';
import Close from './Controls/Close';

const styles = theme => ({
  root: {
    WebkitAppRegion: 'drag',
    height: 23,
    width: '100%',
    backgroundColor: theme.palette.primary[800],
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    flex: '0 0 auto'
  },
  resizeBar: {
    WebkitAppRegion: 'no-drag',
    position: 'absolute',
    height: 3,
    width: '100%',
    top: 0,
    left: 0
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
      backgroundColor: 'rgba(255,255,255, 0.1)'
    },
    '&:last-of-type': {
      '&:hover': {
        backgroundColor: '#dd3333'        
      }
    }
  },
});

class FrameControls extends Component {
  render() {
    const { classes, electron, minimize, maximize, close } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.resizeBar} />
          <Typography className={classes.title}>{this.props.title}</Typography>
          <div className={classes.controls}>
            <div role="presentation" onClick={minimize} className={classes.controlButton}>
              <Minimize />
            </div>
            <div role="presentation" onClick={maximize} className={classes.controlButton}>
              <Maximize isMaximized={electron.maximized} />
            </div>
            <div role="presentation" onClick={close} className={classes.controlButton}>
              <Close />
            </div>
          </div>
      </div>
    );
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
