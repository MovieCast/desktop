/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Typography,
  Button,
  Chip,
  Menu,
  MenuItem
} from 'material-ui';
import { PlayArrow as PlayIcon } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

import Rating from '../Util/Rating';
import { capitalize } from '../../utils/stringUtil';


const styleSheet = theme => ({
  meta: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    zIndex: 3,
    marginTop: -36,
    transition: theme.transitions.create('opacity', { duration: 1300 })
  },
  content: theme.mixins.gutters({
    position: 'absolute',
    bottom: 0,
    height: '60vh',
    width: '100%',
    display: 'block',
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

  downloading: {
    transition: theme.transitions.create('all', { duration: 1300 }),
    opacity: 0,
    zIndex: 0,
    height: 0
  },

  qualityButton: {
    position: 'absolute',
    top: 0,
    right: 100,
    padding: 8,
    borderRadius: 2,
    marginTop: -20,
    marginRight: 24,
    zIndex: 3,
    height: 40,
    background: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.background.contentFrame,
    }
  }
});

class MediaDetail extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedTorrent: PropTypes.shape({
      hash: PropTypes.string,
      seeds: PropTypes.number,
      peers: PropTypes.number,
      size: PropTypes.number,
      quality: PropTypes.string,
      fileSize: PropTypes.string,
      provider: PropTypes.string
    }),

    onPlay: PropTypes.func,
    onTorrentChange: PropTypes.func,

    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  }

  static defaultProps = {
    visible: true,
    selectedTorrent: {},
    onPlay: () => {},
    onQualityChange: () => {},
    onTorrentChange: () => {}
  }

  state = {
    anchorEl: null
  }

  handleTorrentChoose = (event, torrent) => {
    this.setState({ anchorEl: null });
    this.props.onTorrentChange(torrent);
  }

  render() {
    const { classes, item, visible, selectedTorrent, onPlay } = this.props;

    const contentClassName = classNames(classes.content, {
      [classes.downloading]: !visible
    });

    return (
      <div className={contentClassName}>
        <div className={classes.meta}>
          <Rating
            rating={item.rating.percentage / 10}
            title={item.rating.percentage}
          />
          <span className={classes.metaHeaderDot} />
          <div className={classes.row}>
            {item.genres && item.genres.map(genre => (
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


        <Button
          className={classes.qualityButton}
          onClick={(event) => this.setState({ anchorEl: event.currentTarget })}
        >
          {selectedTorrent && selectedTorrent.quality}
        </Button>

        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onRequestClose={() => this.setState({ anchorEl: null })}
        >
          {item.torrents.map((torrent) => (
            <MenuItem
              key={torrent.hash}
              selected={selectedTorrent && torrent.quality === selectedTorrent.quality}
              onClick={event => this.handleTorrentChoose(event, torrent)}
            >
              {torrent.quality}
            </MenuItem>
          ))}
        </Menu>

        <Button fab color="primary" className={classes.playButton} disabled={!selectedTorrent} onClick={onPlay}>
          <PlayIcon />
        </Button>
        <Typography type="headline">{item.title}</Typography>
        <div className={classes.info}>
          <Typography>{item.synopsis}</Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MediaDetail);
