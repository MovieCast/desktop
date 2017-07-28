import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class AutoUpdater extends Component {
  state = {
    open: true
  }

  handleRequestClose() {
    console.log('Trying to close snackbar');
    this.setState({
      open: false
    });
  }

  render() {
    const { updater } = this.props;

    return (
      <div>
        <Message
          open={updater.checkingForUpdate}
          message="Checking for updates..."
          duration={10e3}
        />
        <Message
          open={updater.updateAvailable}
          message="There's an update available"
          duration={10e3}
        />
        <Message
          open={updater.updateDownloaded}
          message="Update downloaded, restarting in 5 seconds"
        />
        <Message
          open={!!updater.updateError}
          message="An error occured while downloading updates"
          duration={10e3}
        />
        <Message
          open={updater.updateNotAvailable}
          message="MovieCast is up-to-date"
          duration={2e3}
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AutoUpdater.propTypes = {
  updater: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default AutoUpdater;
