import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import NavLayout from './Layouts/Nav/NavLayout';

const styles = theme => ({
    root: {
        //position: 'absolute',
        //top: 23,
        //bottom: 0,
        width: "100%",
    },

    layout: {
        flex: "0 1 auto",
    }
});

class FrameLayouts extends Component {
    // Add Layouts here, only mainpage is displayed here
  render() {
    const {classes} = this.props;
    return (
        <div className={classes.root}>
            <NavLayout /> {/* This one is always visible, except when watching content */}
            {/* <DetailsLayout/> */}
        </div>
    );
  }
}

export default withStyles(styles)(FrameLayouts);