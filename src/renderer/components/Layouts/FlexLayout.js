import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    display: 'flex',
    height: '100%'
  }
}

class FlexLayout extends Component {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(FlexLayout);