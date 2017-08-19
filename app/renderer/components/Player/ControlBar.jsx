import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Toolbar, IconButton, Typography, LinearProgress } from 'material-ui';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  Subtitles as SubtitlesIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from 'material-ui-icons';
import formatTime from '../../helpers/formatTime';

const styleSheet = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.2)',
    transition: theme.transitions.create('opacity'), // TODO: Increase the transition duration a bit
    zIndex: 2
  },
  time: {
    display: 'flex',
    paddingRight: 12,
    paddingTop: 2
  },
  progress: {
    margin: '0 10px',
    flex: '1 1 auto',
  },
  hidden: {
    opacity: 0
  }
});

class ControlBar extends Component {

  getFractionPlayed() {
    const { player } = this.props;
    return player.currentTime / player.duration;
  }

  render() {
    const {
      classes,
      player,
      onTogglePlay,
      onToggleFullscreen
    } = this.props;

    const controlBarClassName = classNames(classes.root, {
      [classes.hidden]: !player.showUi
    });

    return (
      <div
        className={controlBarClassName}
      >
        <Toolbar>
          <IconButton color="contrast" onClick={onTogglePlay}>
            {player.playing ? <PauseIcon /> : <PlayIcon />}
          </IconButton>

          <div className={classes.time}>
            <Typography>
              {formatTime(player.currentTime)}
            </Typography>
            <Typography>
              &nbsp;/&nbsp;
            </Typography>
            <Typography color="secondary">
              {formatTime(player.duration)}
            </Typography>
          </div>

          <LinearProgress
            className={classes.progress}
            mode="determinate"
            value={this.getFractionPlayed() * 100}
          />

          <IconButton color="contrast">
            <VolumeUpIcon />
          </IconButton>
          <IconButton color="contrast">
            <SubtitlesIcon />
          </IconButton>
          <IconButton color="contrast" onClick={onToggleFullscreen}>
            {player.fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Toolbar>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ControlBar.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
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
