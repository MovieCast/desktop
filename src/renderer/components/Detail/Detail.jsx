import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import DynamicImg from '../Util/DynamicImg';
import Rating from '../Util/Rating';

const styleSheet = theme => ({
  wrapper: {
    position: 'relative',
    marginTop: '-64px',
  },
  background: {
    height: '100vh',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    objectFit: 'cover',
    zIndex: 1
  },
  content: {
    height: '100vh',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 2
  },
  poster: {
    position: 'absolute',
    top: 0,
    bottom: 50,
    left: 110,
    boxShadow: '0 0 10px rgba(0,0,0,0.5)', // Use theme for this!
    borderRadius: 2,
    objectFit: 'cover',
    height: 'calc(100vh - 140px - 50px)',
    width: 'calc((100vh - 140px - 50px) * 2 / 3)',
    // maxHeight: '75vh',
    maxWidth: '50vh',
    zIndex: 3
  },
  meta: {
    position: 'absolute',
    top: 0,
    display: 'block',
    left: 'calc(((100vh - 140px - 50px) * 2 / 3) + 170px)'
  },
  metaHeaderDot: {
    display: 'inline-block',
    position: 'relative',
    backgroundColor: '#ffffff',
    margin: '0 16px 2px',
    width: 7,
    height: 7,
    borderRadius: '50%'
  },
  metaHeaderText: {
    display: 'inline-block'
  },
  middle: {
    position: 'relative',
    top: 90,

  },
  bottom: {
    position: 'absolute',
    display: 'block',
    bottom: 0,
    height: 180,
    width: '100%',
    right: 0,
    background: theme.palette.background.default,
  }
});

class Detail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);

    // Make the AppBar transparent and add a back button
    this.props.configureAppBar({
      secondary: this.props.item.title,
      transparent: true,
      back: true
    });
  }

  render() {
    const { item, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <DynamicImg className={classes.background} src={item.images.banner} alt={item.title} />
        <div className={classes.content}>
          <div className={classes.middle}>
            <DynamicImg className={classes.poster} src={item.images.poster} alt="Poster" />
            <div className={classes.meta}>
              <div className={classes.metaHeader}>
                <Rating
                  className={classes.metaHeaderText}
                  rating={item.rating.percentage / 10}
                  title={item.rating.percentage}
                />
                <span className={classes.metaHeaderDot} />
                <Typography className={classes.metaHeaderText}>{item.genres.join(', ')}</Typography>
                <span className={classes.metaHeaderDot} />
                <Typography className={classes.metaHeaderText}>{item.year}</Typography>
                <span className={classes.metaHeaderDot} />
                <Typography className={classes.metaHeaderText}>{item.runtime} min</Typography>
              </div>
              <div className="meta-synop">Synopsis not available.</div>
            </div>
          </div>
          <div className={classes.bottom} />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Detail.propTypes = {
  item: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  configureAppBar: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

Detail.defaultProps = {
  item: {}
};

export default withStyles(styleSheet)(Detail);
