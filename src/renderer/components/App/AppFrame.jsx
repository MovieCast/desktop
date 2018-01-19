import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AutoUpdater from '../../containers/AutoUpdater';

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
    },
    '::-webkit-scrollbar': {
      width: 13,
      height: 13
    },
    '::-webkit-scrollbar-button': {
      width: 0,
      height: 0
    },
    '::-webkit-scrollbar-thumb': {
      background: '#1e1e1e',
      border: '0px none #ffffff'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#262626'
    },
    '::-webkit-scrollbar-thumb:active': {
      background: '#141414'
    },
    '::-webkit-scrollbar-corner': {
      background: 'transparent'
    }
  },
  appFrame: {
    height: '100vh',
    width: '100%',
  }
});

class AppFrame extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.appFrame}>
        <AutoUpdater />
        {children}

        {/* <TorrentEngineDialog
          open={this.state.torrentEngineInfo}
          onRequestClose={() => this.setState({ torrentEngineInfo: false })}
        /> */}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppFrame);
