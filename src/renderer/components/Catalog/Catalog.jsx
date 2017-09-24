/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { AppBar, Tabs, Tab, Grid, CircularProgress, Button } from 'material-ui';

import CatalogItem from './CatalogItem';

// styles
import styles from './Catalog.css';

const styleSheet = theme => ({
  root: {
    height: 'calc(100% - 64px - 29px)',
    marginTop: 'calc(64px + 29px)',
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
    sort: 0
  }

  componentWillMount() {
    const { filter: { genre, sort } } = this.props;

    this.props.configureAppBar({
      title: 'Movies' // TODO: This should be able to switch between shows and movies
    });

    this.props.fetchItems({
      page: 1,
      genre,
      sort
    });
  }

  loadMore = () => {
    const { filter: { page } } = this.props;

    this.props.setFilter({
      page: page + 1
    });
  }

  loadDetail(event, item) {
    this.props.history.push(`/movie/${item.id}`);
  }

  handleChange(event, index) {
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

    this.props.setFilter({
      page: 1,
      sort
    });

    this.setState({ sort: index });
  }

  render() {
    const { classes, result } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.sort} onChange={this.handleChange.bind(this)}>
            <Tab label="Trending" />
            <Tab label="Year" />
            <Tab label="A-Z" />
          </Tabs>
        </AppBar>
        <div className={styles.scroll}>
          <Grid container align="flex-start" justify="space-around" className={classes.gridList}>
            {_.map(result, (item => (
              <CatalogItem
                key={item._id}
                id={item._id}
                title={item.title}
                poster={item.images.poster}
                year={item.year}
                rating={item.rating.percentage / 10}
              />
            )))}
            <Grid item align="center" justify="center" direction="column" style={{ height: 345, width: 230 }}>
              <div className={classes.more}>
                <CircularProgress className={classes.progress} size={50} />
                <Button onClick={this.loadMore}>Load More</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Catalog.propTypes = {
  // catalog: PropTypes.object.isRequired,
  result: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  configureAppBar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(Catalog);
