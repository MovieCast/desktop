import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class AutoUpdater extends Component {
  state = {
    open: true
  }

  handleRequestClose() {
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
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <Message
          open={updater.updateAvailable}
          message="There's an update available"
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <Message
          open={updater.updateDownloaded}
          message="Update downloaded."
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <Message
          open={!!updater.updateError}
          message="An error occured while downloading updates"
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <Message
          open={updater.updateNotAvailable}
          message="MovieCast is up-to-date"
          onRequestClose={this.handleRequestClose.bind(this)}
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
