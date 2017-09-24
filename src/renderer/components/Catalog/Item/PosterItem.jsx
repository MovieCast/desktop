/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';

import BaseItem from './BaseItem';

import DynamicImg from '../../Util/DynamicImg';
import Rating from '../../Util/Rating';

const styles = theme => ({
  tile: {
    backgroundColor: theme.palette.background.paper,
  },
  poster: {
    height: '100%',
  }
});

class PosterItem extends Component {

  render() {
    const { classes, id, title, poster, year, rating } = this.props;
    return (
      <BaseItem once>
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
      </BaseItem>
    );
  }
}

PosterItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default withStyles(styles)(PosterItem);
