import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Grid, CircularProgress, Button } from 'material-ui';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';

// styles
import styles from './Catalog.css';

const styleSheet = createStyleSheet(theme => ({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  more: {
    background: theme.palette.background.paper,
    width: 230,
    height: 345,
    display: 'flex'
  }
}));

class Catalog extends Component {
  state = {
    sort: 0
  }

  componentWillMount() {
    const { catalog: { genre, sort } } = this.props;

    this.props.fetchItems({
      page: 1,
      genre,
      sort
    });
  }

  loadMore = () => {
    const { catalog: { page } } = this.props;

    this.props.fetchItems({
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
        sort = 'year';
        break;
      case 1: // Trending
        sort = 'download_count';
        break;
      case 2: // Title
        sort = 'title';
        break;
      default:
        sort = 'year';
    }

    this.props.fetchItems({
      page: 1,
      sort
    });

    this.setState({ sort: index });
  }

  render() {
    const { classes, catalog: { items } } = this.props;

    return (
      <div>

        <AppBar position="static">
          <Tabs index={this.state.sort} onChange={this.handleChange.bind(this)}>
            <Tab label="Year" />
            <Tab label="Trending" />
            <Tab label="A-Z" />
          </Tabs>
        </AppBar>
        <div className={styles.scroll}>
          <Grid container align="flex-start" justify="space-around" className={classes.gridList}>
            {_.map(items, (item =>
              (<Grid key={item.id} item>
                <GridListTile component={Link} to={`/movie/${item.id}`}>
                  <img src={item.medium_cover_image} alt={item.title} />
                  <GridListTileBar
                    title={item.title}
                    subtitle={
                      <span>
                        {item.year} - {item.rating}
                      </span>
                    }
                  />
                </GridListTile>
              </Grid>)
            ))}
            <Grid container align="center" justify="center" direction="column" className={classes.more}>
              <CircularProgress className={classes.progress} size={50} />
              <Button onClick={this.loadMore}>Load More</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Catalog.propTypes = {
  catalog: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(Catalog);
