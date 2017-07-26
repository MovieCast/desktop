import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AppDrawer from './AppDrawer';
import AppControls from './AppControls';

const styleSheet = createStyleSheet('AppFrame', theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
    }
  },
  appFrame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    // transition: theme.transitions.create('width'),
    WebkitAppRegion: 'drag'
  },
  button: {
    WebkitAppRegion: 'no-drag'
  },
  appBarHome: {
    // backgroundColor: 'transparent',
    // boxShadow: 'none',
  },
  appBarShift: {
    width: 'calc(100% - 250px)',
  }
}));

class AppFrame extends Component {
  constructor(props) {
    super(props);

    this.state = { drawerOpen: false };
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { children, classes } = this.props;
    const appBarClassName = classNames(classes.appBar, classes.appBarHome);

    return (
      <div className={classes.appFrame}>
        <AppBar className={appBarClassName} >
          <Toolbar>
            <IconButton
              color="contrast"
              onClick={this.handleDrawerToggle}
              className={classes.button}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} type="title" color="inherit" noWrap>
              MovieCast
            </Typography>
            <div className={classes.grow} />
            <AppControls />
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          onRequestClose={this.handleDrawerClose}
          open={this.state.drawerOpen}
        />
        {children}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppFrame);
