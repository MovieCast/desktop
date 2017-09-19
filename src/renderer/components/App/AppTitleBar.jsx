import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Minimize from '../Icon/Minimize';
import Maximize from '../Icon/Maximize';
import Close from '../Icon/Close';

const styles = theme => ({
  root: {
    WebkitAppRegion: 'drag',
    position: 'absolute',
    top: 0,
    height: 29,
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.primary[700],
    zIndex: 30000
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
    paddingRight: 10
  },
  title: {
    flexGrow: 1
  },
  controls: {

  }
});

class AppTitleBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.resizeBar} />
        <div className={classes.wrapper}>
          <div className={classes.title}>
            <Typography>MovieCast</Typography>
          </div>
          <div className={classes.controls}>
            <Minimize />
            <Maximize />
            <Close />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppTitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(AppTitleBar);
