import { ipcRenderer as ipc } from 'electron';
import React, { Component } from 'react';
import { translate, Interpolate } from 'react-i18next';
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
import MarkdownElement from './MarkdownElement';

const style = theme => ({
  circle: {
    transition: theme.transitions.create('all', { duration: 1300 }),
  },
  modalRoot: {
    zIndex: 3000
  }
});

class AutoUpdater extends Component {
  timer: null

  state = {
    showError: false,
    showChangelog: false
  }

  handleShowError = (event, message) => {
    this.setState({ showError: true });
    message.close();
  }

  handleShowChangelog = (event, message) => {
    this.setState({ showChangelog: true });
    // message.close();
  }

  handleRequestClose = (event, dialog) => {
    this.setState({ [dialog]: false });
  }

  render() {
    const { t, updater, classes } = this.props;

    return (
      <div>
        <Message
          open={updater.checkingForUpdate}
          icon={<CircularProgress size={32} />}
          message={t('updater.checkingForUpdate')}
          actions={(message) => ([
            <CloseAction key="close" message={message} />
          ])}
        />
        <Message
          open={updater.updateAvailable}
          icon={<RefreshIcon />}
          message={t('updater.updateAvailable')}
          actions={(message) => ([
            <Button
              key="changelog"
              color="inherit"
              onClick={(event) => {
                this.handleShowChangelog(event, message);
              }}
            >
              {t('changelog')}
            </Button>,
            <Button
              key="install"
              color="inherit"
              onClick={() => {
                ipc.send('installUpdate');
              }}
            >
              {t('install')}
            </Button>,
            <CloseAction key="close" message={message} />
          ])}
          // duration={10e3}
        />
        <Message
          open={!!updater.updateDownloading}
          icon={<CircularProgress mode="determinate" value={updater.updateDownloading} size={32} classes={{ circle: classes.circle }} />}
          message={<Interpolate i18nKey="updater.updateDownloading" value={updater.updateDownloading} />}
          actions={(message) => ([
            <CloseAction key="close" message={message} />
          ])}
        />
        <Message
          open={updater.updateDownloaded}
          icon={<DoneIcon />}
          message={t('updater.updateDownloaded')}
        />
        <Message
          open={!!updater.updateError}
          icon={<ErrorIcon />}
          message="An error occured while downloading updates"
          actions={(message) => ([
            <Button
              key="details"
              color="inherit"
              onClick={(event) => {
                this.handleShowError(event, message);
              }}
            >
              {t('details')}
            </Button>,
            <CloseAction key="close" message={message} />
          ])}
        />
        <Message
          open={updater.updateNotAvailable}
          icon={<SuccessIcon />}
          message={t('updater.updateNotAvailable')}
          duration={10e3}
          actions={(message) => ([
            <CloseAction key="close" message={message} />
          ])}
        />

        <Dialog open={this.state.showError} onRequestClose={(event) => this.handleRequestClose(event, 'showError')}>
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
            <Button onClick={(event) => this.handleRequestClose(event, 'showError')} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.showChangelog} classes={{ root: classes.modalRoot }} onRequestClose={(event) => this.handleRequestClose(event, 'showChangelog')}>
          <DialogTitle>
            Changelog: {updater.updateInfo.releaseName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <MarkdownElement text={updater.updateInfo.releaseNotes} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(event) => this.handleRequestClose(event, 'showChangelog')} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AutoUpdater.propTypes = {
  t: PropTypes.func.isRequired,
  updater: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default translate()(withStyles(style)(AutoUpdater));
