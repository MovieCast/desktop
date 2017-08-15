import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import VideoSurface from './Media';
import ControlBar from './ControlBar';

const styleSheet = createStyleSheet('Player', {
  root: {
    position: 'relative',
    marginTop: '-64px',
    height: '100vh'
  },
  hideCursor: {
    cursor: 'none'
  }
});

class Player extends Component {

  state = {
    playing: true,
    showUi: true
  }

  componentWillMount() {
    // Make the AppBar transparent and add a back button
    this.props.configureAppBar({
      secondary: 'Playing: No Title',
      transparent: true,
      hidden: !this.state.showUi, // hoverzzzz
      back: true
    });
  }

  componentDidMount() {
    this.handleHover();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.showUi !== this.state.showUi) {
      this.props.configureAppBar({
        hidden: nextState.showUi, // hoverzzzz
      });
    }
  }

  handleHover = debounce(() => {
    this.hoverTimeout && clearTimeout(this.hoverTimeout);

    this.setState({ showUi: true });
    this.hoverTimeout = setTimeout(() => {
      this.setState({
        showUi: false
      });
    }, 5000);
  }, 400, {
    leading: true,
    trailing: false
  })

  render() {
    const { classes } = this.props;
    const playerClassName = classNames(classes.root, {
      [classes.hideCursor]: !this.state.showUi
    });
    return (
      <div
        className={playerClassName}
        onMouseMove={this.handleHover}
      >
        <VideoSurface />
        <ControlBar hidden={!this.state.showUi} />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Player.propTypes = {
  classes: PropTypes.object.isRequired,
  configureAppBar: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(Player);
