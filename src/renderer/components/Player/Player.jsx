/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { withStyles } from 'material-ui/styles';
import Engine from './Engine';
import Overlay from './Overlay';
import ControlBar from './ControlBar';

import { withView, View } from '../View';
import SubtitleDialog from './SubtitleDialog';

const styleSheet = {
  root: {
    position: 'fixed',
    top: 0,
    height: '100vh',
    width: '100%'
    // marginTop: -64 - 29
  },
  hideCursor: {
    cursor: 'none'
  }
};

class Player extends Component {
  state = {
    showSubtitleDialog: false
  }

  componentWillMount() {
    // Make the AppBar transparent and add a back button
    this.context.setStatusBarConfig({
      transparent: true
    });
    this.context.setAppBarConfig({
      // title: `Playing: ${this.props.player.title}`,
      title: 'playing',
      transparent: true,
      back: true,
      visible: true
    });
  }

  componentDidMount() {
    this.handleHover();
    // Let's auto start :D
    this.props.togglePlay(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.fullscreen !== this.props.player.fullscreen) {
      this.context.setStatusBarConfig({
        visible: !nextProps.player.fullscreen
      });
    }

    if (nextProps.player.showUi !== this.props.player.showUi) {
      // this.context.setBarVisibility(!this.props.player.showUi);

      this.context.setAppBarConfig({
        visible: !this.props.player.showUi
      });
    }

    // TODO: Handle this directly in the application reducer
    // if (nextProps.player.title !== this.props.player.title) {
    //   // this.context.setBarTitle(`Playing: ${this.props.player.title}`);
    //   this.context.setAppBarConfig({
    //     title: `Playing: ${this.props.player.title}`,
    //   });
    // }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.player === this.props.player) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this.hoverTimeout && clearTimeout(this.hoverTimeout);

    // Well there is no other place in the application to exit fullscreen so lets force it here
    if (this.props.player.fullscreen) {
      this.toggleFullscreen();
    }

    this.props.onUnload();
  }

  handleReady = () => {
    this.props.setBuffering(false);
    this.props.updateDuration(this.player.getDuration());
  }

  handleWaiting = () => {
    this.props.setBuffering(true);
  }

  handleEnded = () => {
    this.props.togglePlay(false);
  }

  handleTimeUpdate = () => {
    this.props.updateCurrentTime(this.player.getCurrentTime());
  };

  handleTogglePlay = () => {
    this.props.togglePlay();
  }

  handleToggleSubtitles = () => {
    this.setState({ showSubtitleDialog: !this.state.showSubtitleDialog });
  }

  toggleFullscreen = () => {
    this.props.toggleFullscreen();
  }

  handleSeek = (event, value) => {
    console.log(value);
    this.player.seek(value);
  }

  handleHover = debounce(() => {
    this.hoverTimeout && clearTimeout(this.hoverTimeout);

    this.props.toggleUi(true);
    this.hoverTimeout = setTimeout(() => {
      this.props.toggleUi(false);
    }, 5000);
  }, 400, {
    leading: true,
    trailing: false
  })

  ref = player => {
    this.player = player;
  }

  render() {
    const { classes, player } = this.props;
    const playerClassName = classNames(classes.root, {
      [classes.hideCursor]: !player.showUi
    });

    return (
      <div
        className={playerClassName}
        onMouseMove={this.handleHover}
      >
        <Engine
          player={player}
          onRef={this.ref}
          onEnded={this.handleEnded}
          onLoadedMetadata={(event, data) => { console.log(event, data); }}
          onReady={this.handleReady}
          onWaiting={this.handleWaiting}
          onTimeUpdate={this.handleTimeUpdate}
        >
          <Overlay
            player={player}
            onClick={this.handleTogglePlay}
          />
          <ControlBar
            player={player}
            onTogglePlay={this.handleTogglePlay}
            onToggleSubtitles={this.handleToggleSubtitles}
            onToggleFullscreen={this.toggleFullscreen}
            onSeek={this.handleSeek}
          />
        </Engine>

        <SubtitleDialog open={this.state.showSubtitleDialog} onClose={this.handleToggleSubtitles} />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Player.propTypes = {
  classes: PropTypes.object.isRequired,
  // Player state
  player: PropTypes.object.isRequired,
  // Player actions
  togglePlay: PropTypes.func.isRequired,
  setBuffering: PropTypes.func.isRequired,
  // setUrl: PropTypes.func.isRequired,
  // updateVolume: PropTypes.func.isRequired,
  // updatePlaybackRate: PropTypes.func.isRequired,
  updateDuration: PropTypes.func.isRequired,
  updateCurrentTime: PropTypes.func.isRequired,
  // updateTracks: PropTypes.func.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  toggleUi: PropTypes.func.isRequired,

  onUnload: PropTypes.func.isRequired

};
/* eslint-enable react/forbid-prop-types */

Player.contextTypes = {
  ...View.childContextTypes
};

export default withView(withStyles(styleSheet)(Player));
