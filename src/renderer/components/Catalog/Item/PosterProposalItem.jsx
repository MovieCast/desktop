/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';

import { ButtonBase, Typography } from 'material-ui';

import BaseItem from './BaseItem';

import DynamicImg from '../../Util/DynamicImg';
import Rating from '../../Util/Rating';

const styles = theme => ({
  tile: {
    backgroundColor: theme.palette.background.paper,
  },
  poster: {
    height: '100%',
    width: '100%'
  },
  button: {
    position: 'relative',
    height: '100%',
    width: '100%',
    // borderRadius: 5, // Need to wait for this to be fixed in Chromium
    '&:hover $buttonBackdrop': {
      opacity: 0.4
    },
    overflow: 'hidden',
    boxShadow: theme.shadows[14]
  },
  buttonImage: {
    position: 'absolute',
    height: '100%',
    objectFit: 'cover',
    margin: '0 auto 0'
  },
  buttonBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.15,
    transition: theme.transitions.create('opacity')
  },
  info: {
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden'
  },
  infoTitle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  infoRating: {
    marginRight: 5
  },
  infoMeta: {
    lineHeight: '19px',
    marginRight: 5
  }
});

class PosterItem extends Component {
  render() {
    const { classes, id, title, poster, year, rating } = this.props;
    return (
      <div style={{ width: 230 }}>
        <BaseItem>
          <ButtonBase
            focusRipple
            className={classes.button}
            component={Link}
            to={`/movie/${id}`}
          >
            <DynamicImg
              className={classes.buttonImage}
              src={poster}
              alt={title}
            />
            <span className={classes.buttonBackdrop} />
          </ButtonBase>
        </BaseItem>
        <div className={classes.info}>
          <Typography
            type="body2"
            className={classes.infoTitle}
          >{title}</Typography>
          <span style={{ display: 'flex' }}>

            <Typography
              type="caption"
              className={classes.infoMeta}
            >
              {year}
            </Typography>
            <Rating
              rating={rating}
              size={12}
              // className={classes.infoRating}
            />
          </span>
        </div>
      </div>
    );
  }
}

PosterItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string,
  year: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

PosterItem.defaultProps = {
  poster: null
};

export default withStyles(styles)(PosterItem);
