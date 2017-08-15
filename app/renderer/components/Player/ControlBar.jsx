import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { Toolbar, IconButton } from 'material-ui';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  Subtitles as SubtitlesIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from 'material-ui-icons';

const styleSheet = createStyleSheet('ControlBar', theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.2)',
    transition: theme.transitions.create('opacity'), // TODO: Increase the transition duration a bit
  },
  grow: {
    flex: '1 1 auto',
  },
  hidden: {
    opacity: 0
  }
}));

class ControlBar extends Component {

  render() {
    const {
      classes,
      hidden,
      playing,
      fullscreen,
      onTogglePlay,
      onToggleFullscreen
    } = this.props;

    const controlBarClassName = classNames(classes.root, {
      [classes.hidden]: hidden
    });

    return (
      <div
        className={controlBarClassName}
      >
        <Toolbar>
          <IconButton color="contrast" onClick={onTogglePlay}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <div className={classes.grow} />
          <IconButton color="contrast">
            <VolumeUpIcon />
          </IconButton>
          <IconButton color="contrast">
            <SubtitlesIcon />
          </IconButton>
          <IconButton color="contrast" onClick={onToggleFullscreen}>
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Toolbar>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ControlBar.propTypes = {
  classes: PropTypes.object.isRequired,
  playing: PropTypes.bool.isRequired,
  hidden: PropTypes.bool,
  fullscreen: PropTypes.bool,
  onTogglePlay: PropTypes.func,
  onToggleFullscreen: PropTypes.func
};
/* eslint-enable react/forbid-prop-types */

ControlBar.defaultProps = {
  hidden: false,
  fullscreen: false,
  onTogglePlay: () => {},
  onToggleFullscreen: () => {}
};

export default withStyles(styleSheet)(ControlBar);
