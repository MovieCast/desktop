/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer as ipc } from 'electron';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  List, ListItem, ListItemText, ListItemSecondaryAction, Button } from 'material-ui';

export default class StreamerDialog extends Component {
  static propTypes = {
    streamer: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func
  }

  static defaultProps = {
    open: false,
    onClose: () => {}
  }

  render() {
    const { open, onClose, streamer } = this.props;

    return (
      <Dialog
        open={open}
        onRequestClose={onClose}
      >
        <DialogTitle>
          Streamer Info
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below you will see an overview with all the collected information from the Streamer
          </DialogContentText>
          <List>
            <ListItem>
              <ListItemText
                primary="Status"
                secondary={streamer.status}
              />
              {streamer.status === 'STARTED' && (
                <ListItemSecondaryAction>
                  <Button onClick={() => ipc.send('stream:stop')}>
                      Stop
                  </Button>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            {streamer.status === 'STARTED' && (
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={'unknown_error'}
                />
                <ListItemSecondaryAction>
                  <Button disabled>
                      Start Player
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
