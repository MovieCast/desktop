/* eslint-disable react/forbid-prop-types */

import prettierBytes from 'prettier-bytes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer as ipc } from 'electron';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider,
  List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, Button,
  LinearProgress } from 'material-ui';

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

  remainingTime() {
    const { torrent } = this.props.streamer;

    if (!torrent.eta) {
      return 'Unknown time remaining';
    } else if (torrent.eta > 3600) {
      return `${Math.round(torrent.eta / 3600)} hour(s) remaining`;
    } else if (torrent.eta > 60) {
      return `${Math.round(torrent.eta / 60)} minute(s) remaining`;
    } else if (torrent.eta <= 60) {
      return `${torrent.eta} second(s) remaining`;
    }
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
            Below you can see an overview of all the collected information from the Streamer
          </DialogContentText>
          <List subheader={<ListSubheader>Global</ListSubheader>}>
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
            {streamer.status !== 'STOPPED' && (
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={streamer.location.local}
                />
              </ListItem>
            )}
            {streamer.torrent && (
              <ListItem>
                <ListItemText
                  primary="Torrent Status"
                  secondary={streamer.torrent.status}
                />
              </ListItem>
            )}
          </List>
          <Divider />
          {streamer.torrent && (
            <List subheader={<ListSubheader>Torrent</ListSubheader>}>
              <ListItem>
                <ListItemText
                  primary="Ready"
                  secondary={streamer.torrent.ready ? 'True' : 'False'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Name"
                  secondary={streamer.torrent.name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Path"
                  secondary={streamer.torrent.path}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Progress"
                  secondary={<LinearProgress mode="determinate" value={streamer.torrent.progress || 0} />}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Remaining time"
                  secondary={this.remainingTime()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Download Speed"
                  secondary={`${prettierBytes(streamer.torrent.downloadSpeed || 0)}/s`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Upload Speed"
                  secondary={`${prettierBytes(streamer.torrent.uploadSpeed || 0)}/s`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Peers"
                  secondary={streamer.torrent.peers || 0}
                />
              </ListItem>
            </List>
          )}
          <Divider />
          {streamer.file && (
            <List subheader={<ListSubheader>File</ListSubheader>}>
              <ListItem>
                <ListItemText
                  primary="Name"
                  secondary={streamer.file.name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Path"
                  secondary={streamer.file.path}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Size"
                  secondary={prettierBytes(streamer.file.size)}
                />
              </ListItem>
            </List>
          )}
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
