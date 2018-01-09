/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React, { Component } from 'react';
import dimensions from 'react-dimensions';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { AppBar, Tabs, Tab, Grid, IconButton } from 'material-ui';
import { FileDownload as DownloadIcon } from 'material-ui-icons';

import PosterItem from './Item/PosterItem';
import GhostItem from './Item/GhostItem';
import MoreItem from './Item/MoreItem';

import Search from './Search';

import { withView, View } from '../View';

// styles
import styles from './Catalog.css';
import TorrentEngineDialog from '../../containers/TorrentEngineDialog';

const styleSheet = theme => ({
  root: {
    height: 'calc(100% - 64px)',
    // marginTop: 'calc(64px + 29px)',
    width: '100%'
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    position: 'relative'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  more: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  poster: {
    width: 230,
    height: 345,
    display: 'block'
  }
});

class Catalog extends Component {
  state = {
    sort: 0,
    ghostItems: 0,
    torrentEngineInfo: false
  }

  componentWillMount() {
    const { filter: { genre, sort, keywords } } = this.props;

    // this.context.setBarTitle('Movies');
    // this.context.setBarShadow(false);

    this.context.setAppBarConfig({
      title: 'movies',
      rightComponents: [
        <Search
          key="search"
          initialValue={keywords}
          onChange={this.handleSearch}
        />,
        <IconButton
          key="torrentInfo"
          color="contrast"
          onClick={this.handleTorrentEngineInfo}
          title="TorrentEngine Info"
        >
          <DownloadIcon />
        </IconButton>]
    });

    this.props.fetchItems({
      page: 1,
      genre,
      sort
    });
  }

  componentDidMount() {
    // Calculate needed "ghost" items to fix spacing in last row
  }

  componentWillReceiveProps(nextProps) {
    const { result, moreAvailable, containerWidth } = nextProps;

    // Alrighty then, lets see if we can calculate the needed "ghost" items
    // to fill up the empty space in the last row.
    // First we'll calculate how many items can fit in this container
    // After that we can see how many items are missing in the last row
    // NOTICE: Move this part out of the render function, to improve performance.
    //         These calculations only have to be recalculated when
    //         the width changes by a certain amount of pixels
    const itemsPerRow = Math.floor(containerWidth / 230);
    const amountOfRows = (result.length / itemsPerRow);
    const percentageMissing = 1 - (amountOfRows % 1);
    let missingItems = Math.round((percentageMissing * itemsPerRow) - 1);
    if (!moreAvailable) {
      missingItems += 1;
    }

    if (missingItems !== this.state.ghostItems) {
      this.setState({
        ghostItems: missingItems
      });
    }
  }

  handleTorrentEngineInfo = () => {
    this.setState({ torrentEngineInfo: true });
  }

  loadMore = () => {
    const { filter: { page } } = this.props;

    setTimeout(() => {
      this.props.setFilter({
        page: page + 1
      });
    }, 500);
  }

  loadDetail(event, item) {
    this.props.history.push(`/movie/${item.id}`);
  }

  handleChange(event, index) {
    this.setState({ sort: index });

    let sort;
    switch (index) {
      case 0: // Year
        sort = 'trending';
        break;
      case 1: // Trending
        sort = 'year';
        break;
      case 2: // Title
        sort = 'title';
        break;
      default:
        sort = 'year';
    }


    // Give the transition some time to complete
    setTimeout(() => {
      this.props.setFilter({
        page: 1,
        sort
      });
    }, 500);
  }

  handleSearch = (keywords) => {
    this.props.setFilter({
      page: 1,
      keywords
    });
  }

  render() {
    const { t, classes, result, moreAvailable } = this.props;

    return (
      <div className={classes.root}>

        <TorrentEngineDialog
          open={this.state.torrentEngineInfo}
          onRequestClose={() => this.setState({ torrentEngineInfo: false })}
        />

        <AppBar position="static">
          <Tabs value={this.state.sort} onChange={this.handleChange.bind(this)}>
            <Tab label={t('views:catalog.trending')} />
            <Tab label={t('views:catalog.year')} />
            <Tab label={t('views:catalog.az')} />
          </Tabs>
        </AppBar>
        <div className={styles.scroll}>
          <Grid container align="flex-start" justify="space-around" className={classes.gridList}>
            {_.map(result, (item => (
              <PosterItem
                key={item._id}
                id={item._id}
                title={item.title}
                poster={item.images.poster}
                year={item.year}
                rating={item.rating.percentage / 10}
              />
            )))}
            {moreAvailable && <MoreItem onVisible={this.loadMore} />}

            {_.map([...new Array(this.state.ghostItems).keys()], (key) => (
              <GhostItem key={key} />
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Catalog.propTypes = {
  // catalog: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  result: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  moreAvailable: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,

  containerWidth: PropTypes.number.isRequired,
  // containerHeight: PropTypes.number.isRequired
};
/* eslint-enable react/forbid-prop-types */

Catalog.contextTypes = {
  // ...VIEW_CONTEXT_TYPES
  ...View.childContextTypes
};

export default translate()(withView(dimensions()(withStyles(styleSheet)(Catalog))));
