/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';

import DynamicImg from '../Util/DynamicImg';
import Rating from '../Util/Rating';

import handleViewport from '../../internal/handleViewport';

const styles = theme => ({
  root: {
    width: 230,
    height: 345
  },
  tile: {
    backgroundColor: theme.palette.background.paper,
  },
  poster: {
    height: '100%',
  },
  more: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

class CatalogItem extends Component {

  state = {
    isVisible: false
  };

  componentWillReceiveProps(nextProps) {
    // Once an item has load, dont remove it again
    if (!this.state.isVisable && nextProps.inViewport) {
      this.setState({ isVisible: nextProps.inViewport });
    }
  }

  render() {
    const { classes, id, title, poster, year, rating, innerRef } = this.props;
    return (
      <Grid item ref={innerRef} className={classes.root}>
        {this.state.isVisible ? (
          <GridListTile component={Link} to={`/movie/${id}`} classes={{ tile: classes.tile }}>
            <DynamicImg
              src={poster}
              alt={title}
              className={classes.poster}
            />
            <GridListTileBar
              title={title}
              subtitle={
                <span style={{ display: 'flex' }}>
                  {year} - <Rating rating={rating} size={12} />
                </span>
              }
            />
          </GridListTile>
        ) : (
          <div className={classes.more}>
            {/* <CircularProgress className={classes.progress} size={50} /> */}
          </div>
        )}
      </Grid>
    );
  }
}

CatalogItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,

  inViewport: PropTypes.bool.isRequired,
  innerRef: PropTypes.func
};

CatalogItem.defaultProps = {
  innerRef: () => {}
};

export default handleViewport(withStyles(styles)(CatalogItem), { threshold: 0.25 });
