import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    overflowY: 'auto',
  },
  inner: {
    display: 'flex',
    
    height: 100000
  }
}

class DashboardPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.inner}>sdfsdfsdfsdfsdfsdf</div>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardPage);