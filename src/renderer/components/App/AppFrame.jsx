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
