/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, CircularProgress } from 'material-ui';

import BaseItem from './BaseItem';

const styles = theme => ({
  more: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

class MoreItem extends Component {
  render() {
    const { classes, onVisible } = this.props;

    return (
      <BaseItem onVisible={onVisible}>
        <div className={classes.more}>
          <CircularProgress size={50} />
          <Button onClick={onVisible}>Load More</Button>
        </div>
      </BaseItem>
    );
  }
}

MoreItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onVisible: PropTypes.func
};

MoreItem.defaultProps = {
  onVisible: () => {}
};

export default withStyles(styles)(MoreItem);
