/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { AppBar, Tabs, Tab, Grid } from 'material-ui';

import PosterItem from './Item/PosterItem';
import MoreItem from './Item/MoreItem';

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

  componentDidMount() {
    // Calculate needed "ghost" items to fix spacing in last row
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
              <PosterItem
                key={item._id}
                id={item._id}
                title={item.title}
                poster={item.images.poster}
                year={item.year}
                rating={item.rating.percentage / 10}
              />
            )))}
            <MoreItem onVisible={this.loadMore} />

            {/* Show "ghost" items here */}
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
