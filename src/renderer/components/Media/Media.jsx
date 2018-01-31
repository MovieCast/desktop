/* eslint-disable react/forbid-prop-types */

import { ipcRenderer as ipc } from 'electron';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import MediaDetail from './MediaDetail';
import MediaProgress from './MediaProgress';

import Player from '../../containers/Player';

import DynamicImg from '../Util/DynamicImg';
import { withView, View } from '../View';

const styles = {
  root: {
    position: 'relative',
    marginTop: -64 - 29
  },
  loadingContainer: {
    marginTop: -64,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  background: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    objectFit: 'cover',
    zIndex: 0,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.2)'
    }
  },
  wrapper: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center'
  }
};

class Media extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    item: PropTypes.object,
    streamer: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    onLoad: PropTypes.func.isRequired,
    onUnload: PropTypes.func.isRequired
  }

  static defaultProps = {
    loading: true,
    item: {}
  }

  static contextTypes = {
    ...View.childContextTypes
  }

  state = {
    selectedQuality: '720p'
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.onLoad(id);

    this.context.setStatusBarConfig({
      transparent: true
    });
    this.context.setAppBarConfig({
      title: this.props.item.title,
      transparent: true,
      back: true
    });
  }

  componentWillUnmount() {
    this.props.onUnload();

    ipc.send('stream:stop');
  }

  handlePlay = () => {
    const torrent = this.props.item.torrents[this.state.selectedQuality];

    ipc.send('stream:start', torrent.hash);
  }

  handleQualityChange = (quality) => {
    this.setState({ selectedQuality: quality });
  }

  render() {
    const { classes, loading, item, streamer } = this.props;

    if (loading) {
      return (<div className={classes.loadingContainer}>
        <CircularProgress className={classes.progress} size={60} />
      </div>);
    }

    return (
      <div className={classes.root}>
        <DynamicImg
          className={classes.background}
          src={item.images ? item.images.background : null}
          alt={item.title}
        />
        <div className={classes.wrapper}>
          <MediaDetail
            item={item}
            visible={streamer.status === 'STOPPED'}
            selectedQuality={this.state.selectedQuality}
            onQualityChange={this.handleQualityChange}
            onPlay={this.handlePlay}
          />
          {streamer.status === 'STARTING' && (
            <MediaProgress torrent={streamer.torrent} />
          )}

          {streamer.torrent && streamer.torrent.ready && (
            <Player />
          )}
        </div>
      </div>
    );
  }
}

export default withView(withStyles(styles)(Media));
