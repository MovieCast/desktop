import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AutoUpdater from '../../containers/AutoUpdater';

import TorrentEngineDialog from '../../containers/TorrentEngineDialog';

const styleSheet = theme => ({
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
      overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
    }
  },
  appFrame: {
    height: '100vh',
    width: '100%',
  },
  wrapper: {
    // position: 'relative',
    // top: 29,
    width: '100%',
    // height: '100vh'
  },
});

class AppFrame extends Component {
  state = {
    drawerOpen: false,
    torrentEngineInfo: false
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, this.props);
  //   if (nextState !== this.state) {
  //     return true;
  //   }

  //   if (nextProps.children !== this.props.children) {
  //     return true;
  //   }

  //   return false;
  // }

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
    const { children, classes } = this.props;

    return (
      <div className={classes.appFrame}>
        <AutoUpdater />
        {children}

        <TorrentEngineDialog
          open={this.state.torrentEngineInfo}
          onRequestClose={() => this.setState({ torrentEngineInfo: false })}
        />
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
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppFrame);
