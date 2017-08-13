import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Grid, Paper } from 'material-ui';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';

// styles
import styles from './Catalog.css';

// const MOVIE_POSTER_HEIGHT = '';
// const MOVIE_POSTER_WIDTH = '';

const styleSheet = createStyleSheet({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class Catalog extends Component {
  state = {
    sort: 0
  }

  componentWillMount() {
    const { catalog: { page, genre, sort } } = this.props;

    this.props.fetchItems({
      page,
      genre,
      sort
    });

    // Pls let redux take care of this later on...
    window.addEventListener('resize', this.handleResize);

    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);

    // this.handleResize.cancel();
  }

  handleResize = () => {
    // Let's calculate how many items can fit on one row.
    // One movie item has a width of 250px; so if we
    // devide the innerWidth with 250px we can calculate
    // how many items can fit in such space
    const newCols = Math.round(window.innerWidth / 250);

    if (newCols !== this.state.cols) {
      this.setState({ cols: newCols });
    }
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
          {/* <div className={classes.root}> */}
          {/* <GridList
            cellHeight="auto"
            spacing={17}
            cols={this.state.cols}
            className={classes.gridList}
          > */}
          <Grid container align="center" justify="space-around" className={classes.gridList}>
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
          </Grid>
          {/* </div> */}
        </div>

        <div className={styles.scroll}>
          <Grid container align="flex-start" justify="space-between" style={{ padding: `${20}px` }}>

            {_.map(items, (item =>
              (<Grid key={item.id} item>
                <Paper>
                  <Link to={`/movie/${item.id}`}><img src={item.medium_cover_image} alt={item.title} /></Link>
                </Paper>
              </Grid>)
            ))}

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
  fetchItems: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(Catalog);
