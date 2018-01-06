import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui';
import {
  Refresh as RefreshIcon,
  SentimentVeryDissatisfied as ErrorIcon,
  SentimentVerySatisfied as SuccessIcon,
  Done as DoneIcon
} from 'material-ui-icons';

import { withStyles } from 'material-ui/styles';

import Message, { CloseAction } from './Message';

const style = theme => ({
  circle: {
    transition: theme.transitions.create('all', { duration: 1300 }),
  }
});

class AutoUpdater extends Component {
  timer: null

  state = {
    showError: false
  }

  render() {
    const { updater, classes } = this.props;

    return (
      <div>
        <Message
          open={updater.checkingForUpdate}
          icon={<CircularProgress size={32} />}
          message="Checking for updates..."
          actions={(message) => ([
            <CloseAction key="close" message={message} />
          ])}
        />
        <Message
          open={updater.updateAvailable}
          icon={<RefreshIcon />}
          message="There's an update available."
          actions={(message) => ([
            <Button
              key="changelog"
              color="inherit"
            >
            ChangeLog
            </Button>,
            <Button
              key="install"
              color="inherit"
            >
            Install
            </Button>,
            <CloseAction key="close" message={message} />
          ])}
          // duration={10e3}
        />
        <Message
          open={!!updater.updateDownloading}
          icon={<CircularProgress mode="determinate" value={updater.updateDownloading} size={32} classes={{ circle: classes.circle }} />}
          message={`Downloading update ... ${updater.updateDownloading}%`}
          actions={(message) => ([
            <CloseAction key="close" message={message} />
          ])}
        />
        <Message
          open={updater.updateDownloaded}
          icon={<DoneIcon />}
          message="Update successfully downloaded, MovieCast will restart in 5 seconds."
        />
        <Message
          open={!!updater.updateError}
          icon={<ErrorIcon />}
          message="An error occured while downloading updates"
          actions={(message) => ([
            <Button
              key="details"
              color="inherit"
              onClick={() => {
                this.setState({ showError: true });
                message.close();
              }}
            >
            Details
            </Button>,
            <CloseAction key="close" message={message} />
          ])}
        />
        <Message
          open={updater.updateNotAvailable}
          icon={<SuccessIcon />}
          message="MovieCast is up-to-date"
          duration={10e3}
          actions={(message) => ([
            <CloseAction key="close" message={message} />
          ])}
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
  updater: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(style)(AutoUpdater);
