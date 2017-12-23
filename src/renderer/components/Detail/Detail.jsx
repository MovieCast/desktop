import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Typography,
  Button,
  Chip
} from 'material-ui';
import { PlayArrow as PlayIcon } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';
import DynamicImg from '../Util/DynamicImg';
import Rating from '../Util/Rating';

import { capitalize } from '../../utils/stringUtil';

const styleSheet = theme => ({
  wrapper: {
    position: 'relative'
  },
  header: {
    position: 'relative',
    width: '100vw',
    height: '40vh',
    transition: theme.transitions.create('height', { duration: 1300 })
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
    bottom: 5,
    display: 'flex',
    alignItems: 'center',
    // left: 'calc(((100vh - 140px - 50px) * 2 / 3) + 170px)'
    zIndex: 3
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
    position: 'relative',
    backgroundColor: '#ffffff',
    margin: '0 16px',
    width: 7,
    height: 7,
    borderRadius: '50%'
  },
  row: {
    display: 'inline-flex',
    flexWrap: 'wrap'
  },
  chip: {
    marginLeft: 4,
    marginRight: 4
  },

  hidden: {
    opacity: 0,
    zIndex: 0
  },
  fullHeight: {
    height: '100vh'
  }
});

class Detail extends Component {
  state = {
    downloading: false
  }

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

    const headerClassName = classNames(classes.header, {
      [classes.fullHeight]: this.state.downloading
    });

    const metaClassName = classNames(classes.meta, {
      [classes.hidden]: this.state.downloading
    });

    const contentClassName = classNames(classes.content, {
      [classes.hidden]: this.state.downloading
    });

    return (
      <div className={classes.wrapper}>
        <div className={headerClassName}>
          <DynamicImg className={classes.background} src={item.images.banner} alt={item.title} />
          <div className={metaClassName}>
            <Rating
              rating={item.rating.percentage / 10}
              title={item.rating.percentage}
            />
            <span className={classes.metaHeaderDot} />
            <div className={classes.row}>
              {item.genres.map(genre => (
                <Chip
                  label={capitalize(genre)}
                  key={genre}
                  className={classes.chip}
                />
              ))}
            </div>
            <span className={classes.metaHeaderDot} />
            <Typography>{item.year}</Typography>
            <span className={classes.metaHeaderDot} />
            <Typography>{item.runtime} min</Typography>
          </div>
        </div>


        <div className={contentClassName}>
          <Button fab color="primary" className={classes.playButton} onClick={() => this.setState({ downloading: true })}>
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
