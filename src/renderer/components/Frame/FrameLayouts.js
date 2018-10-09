import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import NavLayout from '@/components/Layouts/NavLayout';
import FlexLayout from '@/components/Layouts/FlexLayout';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    width: "100%",
    position: 'relative'
  },
});

function getNavItemsFromChildren(children) {
  return React.Children.map(children, child => ({
    text: child.props.title,
    path: child.props.path,
    icon: child.props.icon
  }));
}

class FrameLayouts extends Component {
  // Add Layouts here, only mainpage is displayed here
  render() {
    const { classes, children } = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <NavLayout items={getNavItemsFromChildren(children)}>
            <FlexLayout>
              {children}
            </FlexLayout>
          </NavLayout>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(FrameLayouts);