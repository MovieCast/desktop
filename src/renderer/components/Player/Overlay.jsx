import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui';
import {
  PlayArrow as PlayIcon
} from 'material-ui-icons';

const styleSheet = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
    zIndex: 1
  },
  middleWrapper: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  middleControl: {
    position: 'relative',
    width: 60,
    height: 60
  },
  middleControlIcon: {
    position: 'absolute',
    top: -2,
    left: -2,
    height: 60,
    width: 60,
    transition: theme.transitions.create('opacity')
  },
  hidden: {
    opacity: 0
  }
});

class Overlay extends Component {

  getFractionPlayed = () => {
    const { player } = this.props;
    return player.currentTime / player.duration;
  }

  render() {
    const {
      classes,
      player,
      onClick,
      onDoubleClick
    } = this.props;

    const iconClassName = classNames(classes.middleControlIcon, {
      [classes.hidden]: !player.showUi
    });

    return (
      <div
        className={classes.root}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <div className={classes.middleWrapper}>
          <div className={classes.middleControl}>
            {!player.playing && <PlayIcon className={iconClassName} />}
            {player.buffering && <CircularProgress className={classes.middleControlIcon} size={60} />}
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Overlay.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func
};
/* eslint-enable react/forbid-prop-types */

Overlay.defaultProps = {
  hidden: false,
  fullscreen: false,
  onClick: () => {},
  onDoubleClick: () => {}
};

export default withStyles(styleSheet)(Overlay);
