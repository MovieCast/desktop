/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';

const styleSheet = createStyleSheet('Media', {
  root: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh'
  }
});

class Media extends Component {
  state = {
    isPaused: false,
    src: 'http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4'
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

  render() {
    return (
      <video
        className={this.props.classes.root}
        src={this.state.src}
        // onDoubleClick={this.props.onDoubleClick}
        // onLoadedMetadata={this.props.onLoadedMetadata}
        // onEnded={this.props.onEnded}
        // onStalled={this.props.onStalled}
        // onError={this.props.onEnded}
        // onTimeUpdate={this.props.onTimeUpdate}
        // onEncrypted={this.props.onEncrypted}
        onCanPlay={this.onCanPlay}
        ref={(p) => this.player = p}
      />
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Media);
