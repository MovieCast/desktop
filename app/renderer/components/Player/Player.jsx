import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Media from './Media';

const styleSheet = createStyleSheet('Player', {
  root: {
    position: 'relative',
    marginTop: '-64px',
  }
});

class Player extends Component {

  componentWillMount() {
    // Make the AppBar transparent and add a back button
    this.props.configureAppBar({
      secondary: 'Playing: No Title',
      transparent: true,
      back: true
    });
  }

  render() {
    return (
      <div
        className={this.props.classes.root}
      >
        <Media />
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
