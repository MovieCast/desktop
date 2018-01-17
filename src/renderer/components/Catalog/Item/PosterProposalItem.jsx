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
  image: {
    position: 'relative',
    borderRadius: 5,
    // height: 200,
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.4
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  // imageButton: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   color: theme.palette.common.white,
  // },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: 5
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.15,
    transition: theme.transitions.create('opacity'),
    borderRadius: 5
  },
  // imageTitle: {
  //   position: 'relative',
  //   padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  // },
  // imageMarked: {
  //   height: 3,
  //   width: 18,
  //   backgroundColor: theme.palette.common.white,
  //   position: 'absolute',
  //   bottom: -2,
  //   left: 'calc(50% - 9px)',
  //   transition: theme.transitions.create('opacity'),
  // }
});

class PosterItem extends Component {
  render() {
    const { classes, id, title, poster, year, rating } = this.props;
    return (
      <BaseItem>
        <ButtonBase
          focusRipple
          className={classes.image}
          component={Link}
          to={`/movie/${id}`}
          // style={{
          //   width: image.width,
          // }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${poster})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              type="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              {/* {title} */}
              Failed to load img
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
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
