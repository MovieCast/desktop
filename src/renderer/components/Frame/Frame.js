import React, { Component } from 'react';

import FrameControls from './FrameControls';
import FrameContent from './FrameContent';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
}

class Frame extends Component {
  // static propTypes = {
    
  // }

  render() {
    const { classes, electron, minimize, maximize, close } = this.props;

    return (
        <div className={classes.root}>
            {/* add title to Redux */}
            <FrameControls electron={electron} minimize={minimize} maximize={maximize} close={close} title="MovieCast"/>
            <FrameContent/>
        </div>
    );
  }
}

export default withStyles(styles)(Frame);