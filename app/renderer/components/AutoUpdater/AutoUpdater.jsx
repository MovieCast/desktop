import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui';
import {
  Refresh as RefreshIcon,
  SentimentVeryDissatisfied as ErrorIcon,
  SentimentVerySatisfied as SuccessIcon
} from 'material-ui-icons';
import Message from './Message';

class AutoUpdater extends Component {
  state = {
    showError: false
  }

  showError = () => {

  }

  render() {
    const { updater } = this.props;

    return (
      <div>
        <Message
          open={updater.checkingForUpdate}
          icon={<CircularProgress size={32} />}
          message="Checking for updates..."
          duration={10e3}
        />
        <Message
          open={updater.updateAvailable}
          icon={<CircularProgress size={32} />}
          message="There's an update available. Starting Download..."
          duration={10e3}
        />
        <Message
          open={!!updater.updateDownloading}
          icon={<CircularProgress mode="determinate" value={updater.updateDownloading} size={32} />}
          message={`Downloading update ... ${updater.updateDownloading}%`}
        />
        <Message
          open={updater.updateDownloaded}
          icon={<RefreshIcon />}
          message="Update downloaded, restarting in 5 seconds"
        />
        <Message
          open={!!updater.updateError && !this.state.showError}
          icon={<ErrorIcon />}
          message="An error occured while downloading updates"
          actions={[
            <Button
              key="details"
              color="inherit"
              onClick={() => this.setState({ showError: true })}
            >
            Details
          </Button>
          ]}
        />
        <Message
          open={updater.updateNotAvailable}
          icon={<SuccessIcon />}
          message="MovieCast is up-to-date"
          duration={2e3}
        />

        <Dialog open={this.state.showError} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            Update Error
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              It seems like an error occured while updating MovieCast,
              a detailed error is shown below.
              <pre style={{ whiteSpace: 'pre-line' }}>
                {updater.updateError}
              </pre>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled color="primary">
              Report
            </Button>
            <Button onClick={() => this.setState({ showError: false })} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>

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
