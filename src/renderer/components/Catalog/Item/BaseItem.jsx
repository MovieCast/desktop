/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';

import handleViewport from '../../../internal/handleViewport';

const styles = theme => ({
  root: {
    width: 230,
    height: 345
  },
  placeholder: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

class BaseItem extends Component {

  state = {
    isVisible: false
  };

  componentWillReceiveProps(nextProps) {
    // Check if the viewport stats have changed
    if (this.props.inViewport !== nextProps.inViewport) {
      // If the item is already visible and we only want it to update
      // once cancel
      if (nextProps.once && (this.state.isVisible && !nextProps.inViewport)) {
        return;
      }

      this.setState({ isVisible: nextProps.inViewport });

      if (nextProps.inViewport) {
        nextProps.onVisible(nextProps.inViewport);
      }
    }
  }

  render() {
    const { classes, children, innerRef } = this.props;
    return (
      <Grid item ref={innerRef} className={classes.root}>
        {this.state.isVisible ? children : <div className={classes.placeholder} /> }
      </Grid>
    );
  }
}

BaseItem.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,

  once: PropTypes.bool,
  onVisible: PropTypes.func,

  inViewport: PropTypes.bool.isRequired,
  innerRef: PropTypes.func
};

BaseItem.defaultProps = {
  innerRef: () => {},
  onVisible: () => {},

  once: false
};

export default handleViewport(withStyles(styles)(BaseItem), { threshold: [0, 0.25] });