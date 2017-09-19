import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { Menu as MenuIcon, ArrowBack as BackIcon, FileDownload as DownloadIcon } from 'material-ui-icons';
import AppTitleBar from './AppTitleBar';
import AppDrawer from './AppDrawer';
import AppControls from './AppControls';
import AutoUpdater from '../AutoUpdater/AutoUpdater';

import TorrentEngineDialog from '../../containers/TorrentEngineDialog';

const styleSheet = theme => {
  console.log(theme.palette);
  return {
    '@global': {
      html: {
        boxSizing: 'border-box',
        userSelect: 'none'
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 24,
      flex: '0 1 auto',
    },
    appBar: {
      // WebkitAppRegion: 'drag',
    // Not sure about this one, it looks a bit weird.
    // transition: theme.transitions.create('background'),
      transition: theme.transitions.create(['box-shadow', 'opacity']),
    },
    button: {
      WebkitAppRegion: 'no-drag'
    },
    appBarTransparent: {
    // backgroundColor: 'transparent',
      backgroundColor: 'rgba(0, 0, 0, 0.2)' // Not completely transparent!
    },
    appBarNoShadow: {
      boxShadow: 'none',
    },
    appBarTitleSecondary: {
      color: 'rgba(255, 255, 255, 0.7)'
    },
    appBarHidden: {
      opacity: 0
    },
    appBarShift: {
      width: 'calc(100% - 250px)',
    },
    wrapper: {
      position: 'relative',
      top: 29,
      width: '100%'
    },
  };
};

class AppFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      torrentEngineInfo: false
    };
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleTorrentEngineInfo = () => {
    this.setState({ torrentEngineInfo: true });
  };

  // TODO: Dont use goBack, since it breaks on refresh
  handleBackAndDrawerButton = () => {
    const { application: { appBar }, history } = this.props;
    if (appBar.back) {
      history.goBack();
    } else {
      this.setState({ drawerOpen: !this.state.drawerOpen });
    }
  };

  render() {
    const { children, classes, updater, application: { appBar } } = this.props;
    const appBarClassName = classNames(classes.appBar, {
      [classes.appBarTransparent]: appBar.transparent,
      [classes.appBarNoShadow]: !appBar.shadow,
      [classes.appBarHidden]: appBar.hidden
    });

    return (
      <div className={classes.appFrame}>
        <AppTitleBar />
        <div className={classes.wrapper}>
          <AppBar className={appBarClassName} position="absolute">
            <Toolbar>
              {/* Preparation for Icon to Icon transition */}
              <IconButton
                color="contrast"
                onClick={this.handleBackAndDrawerButton}
                className={classes.button}
              >
                {appBar.back ? <BackIcon /> : <MenuIcon />}
              </IconButton>
              <div className={classes.title}>
                <Typography type="title" color="inherit" noWrap gutterBottom={!!appBar.secondary}>
                  {appBar.title}
                </Typography>
                {appBar.secondary &&
                  <Typography type="caption" color="secondary" className={classes.appBarTitleSecondary}>
                    {appBar.secondary}
                  </Typography>}
              </div>
              <div className={classes.grow} />
              <IconButton
                color="contrast"
                onClick={this.handleTorrentEngineInfo}
                title="TorrentEngine Info"
                className={classes.button}
              >
                <DownloadIcon />
              </IconButton>
              {/* <AppControls /> */}
            </Toolbar>
          </AppBar>
          <AppDrawer
            className={classes.drawer}
            onRequestClose={this.handleDrawerClose}
            open={this.state.drawerOpen}
          />
          <AutoUpdater updater={updater} />
          {children}

          <TorrentEngineDialog
            open={this.state.torrentEngineInfo}
            onRequestClose={() => this.setState({ torrentEngineInfo: false })}
          />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  // settings: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  updater: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppFrame);
