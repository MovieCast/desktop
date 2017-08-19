import _ from 'lodash';
import prettierBytes from 'prettier-bytes';
import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress
} from 'material-ui';

export class TorrentEngineDialog extends Component {
  renderTorrentList(torrents) {
    return _.map(torrents, this.renderTorrentItem);
  }

  renderTorrentItem(torrent) {
    return (
      <ListItem style={{ display: 'block' }} key={torrent.infoHash}>
        <ListItemText
          style={{ width: '100%' }}
          primary={torrent.name}
        />
        <List>
          <ListItem>
            <ListItemText
              primary="Ready"
              secondary={torrent.ready ? 'true' : 'false'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Status"
              secondary={torrent.status}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Progress"
              secondary={<LinearProgress mode="determinate" value={torrent.progress * 100} />}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Download Speed"
              secondary={`${prettierBytes(torrent.downloadSpeed)}/s`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Upload Speed"
              secondary={`${prettierBytes(torrent.uploadSpeed)}/s`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Peers"
              secondary={torrent.numPeers}
            />
          </ListItem>
        </List>
      </ListItem>
    );
  }

  renderTorrentItemDetail() {

  }

  render() {
    const { open, torrent, onRequestClose } = this.props;
    return (
      <Dialog
        open={open}
        onRequestClose={onRequestClose}
      >
        <DialogTitle>
          Torrent Engine Info (causes lagg)
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below you will see an overview with all the collected information from the Torrent Engine
            <List subheader={<ListSubheader>Torrents</ListSubheader>}>
              {this.renderTorrentList(torrent.torrents)}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TorrentEngineDialog;
