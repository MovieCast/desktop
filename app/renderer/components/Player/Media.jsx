/* eslint-disable react/forbid-prop-types, jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';

const styleSheet = createStyleSheet('Media', {
  root: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
    background: '#000'
  }
});

class Media extends Component {
  state = {
    isPaused: false,
    src: 'http://vjs.zencdn.net/v/oceans.mp4'
  }

  componentDidMount() {
    if (this.player !== null) {
      if (this.state.isPaused && !this.player.paused) {
        this.player.pause();
      } else if (!this.state.isPaused && this.player.paused) {
        this.player.play();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { playing, volume } = this.props;

    if (!playing && nextProps.playing) {
      this.play();
    } else if (playing && !nextProps.playing) {
      this.pause();
    } else if (volume !== nextProps.volume) {
      this.setVolume(nextProps.volume);
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  onCanPlay = (e) => {
    const player = e.target;
    if (player.webkitVideoDecodedByteCount === 0) {
      console.log('Video codec unsupported');
    } else if (player.webkitAudioDecodedByteCount === 0) {
      console.log('Audio codec unsupported');
    } else {
      console.log('We can play boiz');
      player.play();
    }
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.removeAttribute('src');
  }

  setVolume(volume) {
    this.player.volume = volume;
  }

  ref = player => {
    this.player = player;
  }

  render() {
    const {
      onDoubleClick,
      onLoadedMetadata,
      onReady,
      onPlay,
      onPause,
      onEnded,
      onStalled,
      onError,
      onTimeUpdate,
      onProgress
    } = this.props;

    return (
      <video
        ref={this.ref}
        className={this.props.classes.root}
        src={this.state.src}
        onDoubleClick={onDoubleClick}
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onStalled={onStalled}
        onError={onError}
        onTimeUpdate={onTimeUpdate}
        onProgress={onProgress}
      />
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired,
  playing: PropTypes.bool,
  volume: PropTypes.number,
  // tracks: PropTypes.array,
  onDoubleClick: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnded: PropTypes.func,
  onStalled: PropTypes.func,
  onError: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onProgress: PropTypes.func
};

Media.defaultProps = {
  playing: false,
  volume: 0.8,
  // tracks: [],
  onDoubleClick: () => {},
  onLoadedMetadata: () => {},
  onReady: () => {},
  onPlay: () => {},
  onPause: () => {},
  onEnded: () => {},
  onStalled: () => {},
  onError: () => {},
  onTimeUpdate: () => {},
  onProgress: () => {}
};

export default withStyles(styleSheet)(Media);
