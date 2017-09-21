import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button
} from 'material-ui';
import { PlayArrow as PlayIcon } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';
import DynamicImg from '../Util/DynamicImg';
import Rating from '../Util/Rating';

const styleSheet = theme => ({
  wrapper: {
    position: 'relative'
  },
  header: {
    position: 'relative',
    width: '100vw',
    height: '40vh'
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: 0
  },
  meta: {
    position: 'absolute',
    bottom: 0,
    display: 'block',
    // left: 'calc(((100vh - 140px - 50px) * 2 / 3) + 170px)'
    zIndex: 1
  },
  content: theme.mixins.gutters({
    position: 'absolute',
    top: 0,
    height: '100vh',
    width: '100%',
    display: 'block',
    marginTop: '40vh',
    paddingTop: 24,
    right: 0,
    background: theme.palette.background.default,
    zIndex: 2,
    boxShadow: '0px -7px 8px -4px rgba(0, 0, 0, 0.2), 0px -12px 17px 2px rgba(0, 0, 0, 0.14), 0px -5px 22px 4px rgba(0, 0, 0, 0.12)',
  }),
  playButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -28,
    marginRight: 24,
    zIndex: 3,
  },
  info: {
    paddingTop: 24
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
});

class Detail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);

    // Make the AppBar transparent and add a back button
    this.props.configureAppBar({
      title: this.props.item.title,
      transparent: true,
      back: true
    });
  }

  render() {
    const { item, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <DynamicImg className={classes.background} src={item.images.banner} alt={item.title} />
          <div className={classes.meta}>
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
        </div>
        <div className={classes.content}>
          <Button fab color="primary" className={classes.playButton}>
            <PlayIcon />
          </Button>
          <Typography type="headline">{item.title}</Typography>
          <div className={classes.info}>
            <Typography>{item.synopsis}</Typography>
          </div>
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
