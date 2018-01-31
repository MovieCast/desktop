/* eslint-disable react/forbid-prop-types, no-underscore-dangle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import { withStyles } from 'material-ui/styles';
import { PosterItem, MoreItem, GhostItem } from './Item';

const styles = {
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 48px)',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    position: 'relative',
    // transform: 'translateZ(0)'
  }
};

class ItemContainer extends Component {
  state = {
    itemsPerRow: 0,
    missingItems: 0
  }

  componentDidMount() {
    this.calculateGhostItems();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.containerWidth !== nextProps.containerWidth) {
      this.calculateGhostItems();
    } else if (this.props.items.length !== nextProps.items.length) {
      this.calculateGhostItems();
    } else if (this.props.moreAvailable !== nextProps.moreAvailable) {
      this.calculateGhostItems();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.items !== nextProps.items ||
        this.props.moreAvailable !== nextState.moreAvailable) {
      return true;
    }

    if (this.state.missingItems !== nextState.missingItems) {
      return true;
    }

    return false;
  }

  /**
   * Currently party disabled, we will just add a full row so it is always correct
   */
  calculateGhostItems() {
    const { containerWidth } = this.props;
    // Alrighty then, lets see if we can calculate the needed "ghost" items
    // to fill up the empty space in the last row.
    // First we'll calculate how many items can fit in this container
    // After that we can see how many items are missing in the last row

    const itemsPerRow = Math.floor((containerWidth - 12) / 230);
    // const amountOfItems = moreAvailable ? items.length + 1 : items.length;
    // const amountOfRows = (amountOfItems / itemsPerRow);

    // const percentageMissing = 1 - (amountOfRows % 1);

    // const missingItems =
    //   percentageMissing === 1 ? 0 : Math.round(percentageMissing * itemsPerRow);

    // if (amountOfRows !== missingItems && missingItems !== this.state.missingItems) {
    //   this.setState({
    //     missingItems
    //   });
    // }

    if (itemsPerRow !== this.state.missingItems) {
      this.setState({
        missingItems: itemsPerRow
      });
    }
  }

  render() {
    const { classes, items, moreAvailable, onMore } = this.props;

    return (
      <div className={classes.root}>
        {items && items.map(item => (
          <PosterItem
            key={item._id}
            id={item._id}
            title={item.title}
            poster={item.images ? item.images.poster : null}
            year={item.year}
            rating={item.rating.percentage / 10}
          />
        ))}
        {moreAvailable && <MoreItem onVisible={onMore} />}

        {[...new Array(this.state.missingItems).keys()].map((key) => (
          <GhostItem key={key} />
        ))}
      </div>
    );
  }
}

ItemContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  containerWidth: PropTypes.number.isRequired,
  moreAvailable: PropTypes.bool,

  onMore: PropTypes.func
};

ItemContainer.defaultProps = {
  moreAvailable: false,
  onMore: () => {}
};

export default Dimensions()(withStyles(styles)(ItemContainer));
