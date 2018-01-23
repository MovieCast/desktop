/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import prettierBytes from 'prettier-bytes';

import { LinearProgress } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = {
  middleWrapper: {
    display: 'flex',
    width: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    position: 'relative'
  }
};

class MediaProgress extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    torrent: PropTypes.object.isRequired
  }

  render() {
    const { classes, torrent } = this.props;

    return (
      <div className={classes.middleWrapper}>
        <div style={{ width: '100%' }}>
          <LinearProgress style={{ width: '100%' }} />
          {torrent && (
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
              <span>Download Speed: {prettierBytes(torrent.downloadSpeed || 0)}</span>
              <span>Upload Speed: {prettierBytes(torrent.uploadSpeed || 0)}</span>
              <span>Peers: {torrent.peers || 0}</span>
            </div>)}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MediaProgress);
