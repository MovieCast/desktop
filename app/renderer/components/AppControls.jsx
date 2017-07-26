import React, { Component } from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';

import { IconButton } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {
  Remove as RemoveIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Close as CloseIcon
} from 'material-ui-icons';

const styleSheet = createStyleSheet('AppControls', {
  root: {
    display: 'flex'
  },
  button: {
    WebkitAppRegion: 'no-drag'
  }
});

class AppControls extends Component {
  constructor(props) {
    super(props);

    this.window = remote.getCurrentWindow();

    this.state = {
      maximized: false
    };

    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.updateState();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateState);
  }

  updateState() {
    this.setState({
      maximized: this.window.isMaximized()
    });
  }

  handleMaximize() {
    if (this.state.maximized) {
      this.window.unmaximize();
    } else {
      this.window.maximize();
    }

    this.setState({
      maximized: this.window.isMaximized()
    });
  }

  handleMinimize() {
    this.window.minimize();
  }

  handleClose() {
    this.window.close();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <IconButton onClick={this.handleMinimize.bind(this)} className={classes.button}>
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={this.handleMaximize.bind(this)} className={classes.button}>
          {this.state.maximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton onClick={this.handleClose.bind(this)} className={classes.button}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppControls.propTypes = {
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppControls);
