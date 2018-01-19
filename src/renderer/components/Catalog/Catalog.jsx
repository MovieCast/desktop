/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { AppBar, Tabs, Tab, IconButton } from 'material-ui';
import { FileDownload as DownloadIcon } from 'material-ui-icons';

import Search from './Search';
import { withView, View } from '../View';
import ItemContainer from './ItemContainer';
import TorrentEngineDialog from '../../containers/TorrentEngineDialog';

const styles = {
  root: {
    height: 'calc(100% - 64px)',
    width: '100%'
  }
};

class Catalog extends Component {
  state = {
    sort: 0,
    torrentEngineInfo: false
  }

  componentWillMount() {
    const { filter: { genre, sort, keywords } } = this.props;

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

  componentWillUnmount() {
    this.props.onUnload();
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

    this.props.onUnload();

    // Give the transition some time to complete
    setTimeout(() => {
      this.props.setFilter({
        page: 1,
        sort
      });
    }, 200);
  }

  handleSearch = (keywords) => {
    this.props.onUnload();

    this.props.setFilter({
      page: 1,
      keywords
    });
  }

  render() {
    const { t, classes, loading, result, moreAvailable } = this.props;

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
        {!loading && <ItemContainer
          items={result}
          moreAvailable={moreAvailable}
          onMore={this.loadMore}
        />}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Catalog.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  result: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  moreAvailable: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,

  onUnload: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

Catalog.contextTypes = {
  ...View.childContextTypes
};

export default translate()(withView(withStyles(styles)(Catalog)));
