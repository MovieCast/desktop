/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { AppBar, Tabs, Tab, IconButton, CircularProgress, Typography, Button } from 'material-ui';
import { FileDownload as DownloadIcon, ErrorOutline as ErrorIcon } from 'material-ui-icons';

import Search from './Search';
import { withView, View } from '../View';
import ItemContainer from './ItemContainer';
import StreamerDialog from '../../containers/StreamerDialog';
import { ErrorDialog } from '../Util';

const styles = {
  root: {
    height: 'calc(100% - 64px)',
    width: '100%'
  },
  loadingContainer: {
    width: '100%',
    height: 'calc(100% - 48px)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center'
  }
};

class Catalog extends Component {
  state = {
    sort: 0,
    showStreamerInfo: false,
    showError: false
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
          onClick={this.handleStreamerInfo}
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

  handleStreamerInfo = () => {
    this.setState({ showStreamerInfo: true });
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
        sort = 'name';
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

  handleRetry = () => {
    this.props.onUnload();

    this.props.fetchItems();
  }

  render() {
    const { t, classes, loading, error, result, moreAvailable } = this.props;

    return (
      <div className={classes.root}>

        <StreamerDialog
          open={this.state.showStreamerInfo}
          onClose={() => this.setState({ showStreamerInfo: false })}
        />

        <ErrorDialog
          open={this.state.showError}
          onClose={() => this.setState({ showError: false })}
          title="An error occured"
          message={'An error occured while fetching content from https://content.moviecast.xyz. A detailed error is shown below and send to the developers.'}
          error={error && error.stack}
        />

        <AppBar position="static">
          <Tabs value={this.state.sort} onChange={this.handleChange.bind(this)}>
            <Tab label={t('views:catalog.trending')} />
            <Tab label={t('views:catalog.year')} />
            <Tab label={t('views:catalog.az')} />
          </Tabs>
        </AppBar>
        {error && <div className={classes.loadingContainer}>
          <div className={classes.errorMessage}>
            <ErrorIcon style={{ width: 32, height: 32, marginRight: 5 }} />
            <Typography type="title">Wups! It seems an error occured while fetching movies.</Typography>
          </div>
          <div className={classes.errorActions}>
            <Button onClick={this.handleRetry}>Retry</Button>
            <Button onClick={() => this.setState({ showError: true })}>Details</Button>
          </div>
        </div>}

        {!loading ? (
          <ItemContainer
            items={result}
            moreAvailable={moreAvailable}
            onMore={this.loadMore}
          />
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress className={classes.progress} size={60} />
          </div>
        )}
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
