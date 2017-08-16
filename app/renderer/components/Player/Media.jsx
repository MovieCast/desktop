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

  componentDidMount() {
    const { player } = this.props;

    if (this.player !== null) {
      if (!player.playing && !this.player.paused) {
        this.player.pause();
      } else if (player.playing && this.player.paused) {
        this.player.play();
      }
    }
    this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    const { player } = this.props;

    if (!player.playing && nextProps.player.playing) {
      this.play();
      console.log('PLAY!');
    } else if (player.playing && !nextProps.player.playing) {
      this.pause();
      console.log('PAUSE!');
    } else if (player.volume !== nextProps.player.volume) {
      this.setVolume(nextProps.player.volume);
    }
  }

  componentWillUnmount() {
    this.stop();
    this.props.onRef(undefined);
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

  getDuration() {
    return this.player.duration;
  }

  getCurrentTime() {
    return this.player.currentTime;
  }

  ref = player => {
    this.player = player;
  }

  render() {
    const {
      classes,
      player,
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
        className={classes.root}
        src={player.src}
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
  player: PropTypes.object.isRequired,
  onRef: PropTypes.func,
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
  onRef: () => {},
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
