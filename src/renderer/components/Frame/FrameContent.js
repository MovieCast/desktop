import React, { Component } from 'react';

import FrameLayouts from './FrameLayouts';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1
  }
}

class FrameContent extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
           <FrameLayouts/>
        </div>
    );
  }
}

export default withStyles(styles)(FrameContent);