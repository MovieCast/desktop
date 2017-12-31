import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Typography,
  Button,
  Chip,
  LinearProgress
} from 'material-ui';
import { PlayArrow as PlayIcon } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';
import DynamicImg from '../Util/DynamicImg';
import Rating from '../Util/Rating';

import { withView, View } from '../View';

import { capitalize } from '../../utils/stringUtil';

const styleSheet = theme => ({
  wrapper: {
    position: 'relative',
    marginTop: -64
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
    zIndex: 3,
    transition: theme.transitions.create('opacity', { duration: 1300 })
  },
  content: theme.mixins.gutters({
    position: 'relative',
    top: 0,
    height: '100vh',
    width: '100%',
    display: 'block',
    paddingTop: 24,
    right: 0,
    background: theme.palette.background.default,
    zIndex: 2,
    transition: theme.transitions.create('all', { duration: 1300 }),
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

  downloading: {
    // See: https://github.com/cssinjs/jss-nested
    '& $header': {
      height: '100vh',
      '& $meta': {
        opacity: 0
      }
    },
    '& $content': {
      opacity: 0,
      zIndex: 0
    }
  },

  middleWrapper: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    position: 'relative'
  }
});

class Detail extends Component {
  state = {
    downloading: false
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);

    // this.context.setBarTitle(this.props.item.title);
    // this.context.setBarTransparency(true);
    // this.context.setBarBack(true);
    this.context.setBarConfig({
      title: this.props.item.title,
      transparent: true,
      back: true
    });
  }

  render() {
    const { item, classes } = this.props;

    const wrapperClassName = classNames(classes.wrapper, {
      [classes.downloading]: this.state.downloading
    });

    return (
      <div className={wrapperClassName}>
        <div className={classes.header}>
          <DynamicImg className={classes.background} src={item.images.banner} alt={item.title} />

          {this.state.downloading ? (
            <div className={classes.middleWrapper}>
              <div style={{ width: '100%' }}>
                <LinearProgress style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
                  <span>Download Speed: 0kbps</span>
                  <span>Upload Speed: 0kbps</span>
                  <span>Peers: 0</span>
                </div>
              </div>
            </div>
          ) : null}

          <div className={classes.meta}>
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

        <div className={classes.content}>
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
};
/* eslint-enable react/forbid-prop-types */

Detail.defaultProps = {
  item: {}
};

Detail.contextTypes = {
  ...View.childContextTypes
};

export default withView(withStyles(styleSheet)(Detail));
