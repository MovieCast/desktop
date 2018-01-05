/* eslint-disable */
import _ from 'lodash';
import prettierBytes from 'prettier-bytes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress
} from 'material-ui';

export class TorrentEngineDialog extends Component {

  shouldComponentUpdate(nextProps) {
    if(!nextProps.open && !this.props.open) {
      return false;
    }
    return true;
  }

  renderTorrentList(torrents) {
    return _.map(torrents, this.renderTorrentItem.bind(this));
  }

  renderTorrentItem(torrent, index) {
    return (
      <ListItem style={{ display: 'block' }}>
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
            <ListItemSecondaryAction>
              <Button onClick={() => this.props.removeTorrent(index)}>
                Remove
              </Button>
              <Button
                disabled={ this.props.torrent.server.status === 'STARTED'}
                onClick={() => this.props.startStreamServer(index)}>
                Start Stream Server
              </Button>
            </ListItemSecondaryAction>
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

  setupPlayer() {
    const { setUrl, setTitle, torrent: { server, torrents } } = this.props;
    
    const torrent = torrents[server.torrentKey];

    const fileIndex = torrent.files.findIndex(file => file.name.includes('.mp4'));

    if(fileIndex != -1) {
      setUrl(server.location.local + '/' + fileIndex);
      setTitle('unable_to_fetch_error');
      this.context.router.history.push('/player');
    }
  }

  render() {
    const { open, torrent, onRequestClose } = this.props;
    return (
      <Dialog
        open={open}
        onRequestClose={onRequestClose}
      >
        <DialogTitle>
          Torrent Engine Info
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below you will see an overview with all the collected information from the Torrent Engine
            <List subheader={<ListSubheader>Torrents</ListSubheader>}>
              {this.renderTorrentList(torrent.torrents)}
            </List>

            <List subheader={<ListSubheader>Stream Server</ListSubheader>}>
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={torrent.server.status}
                />
                {torrent.server.status === 'STARTED' && (
                  <ListItemSecondaryAction>
                    <Button onClick={() => this.props.stopStreamServer(torrent.server.torrentKey)}>
                      Stop
                    </Button>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {torrent.server.status === 'STARTED' && [
                <ListItem key="location">
                  <ListItemText
                    primary="Location"
                    secondary={torrent.server.location.local}
                  />
                  <ListItemSecondaryAction>
                    <Button onClick={() => this.setupPlayer()}>
                      Start Player
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key="torrentID">
                  <ListItemText
                    primary="TorrentID"
                    secondary={torrent.server.torrentKey}
                  />
                </ListItem>
              ]}
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

TorrentEngineDialog.propTypes = {
  removeTorrent: PropTypes.func.isRequired
}

TorrentEngineDialog.contextTypes = {
  router: PropTypes.object.isRequired
}

export default TorrentEngineDialog;
