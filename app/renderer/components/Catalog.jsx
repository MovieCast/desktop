import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Grid, Paper } from 'material-ui';

class Catalog extends Component {
  state = {
    sort: 0
  }

  componentWillMount() {
    this.props.fetchItems();
  }

  handleChange(event, index) {
    this.setState({ sort: index });
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs index={this.state.sort} onChange={this.handleChange.bind(this)}>
            <Tab label="Trending" />
            <Tab label="A-Z" />
          </Tabs>
        </AppBar>

        <Grid
          container
          align="flex-start"
          justify="space-between"
        >
          {_.map(this.props.items, (item =>
          (<Grid key={item.id} item>
            <Paper>
              <Link to={`/movie/${item.id}`}><img src={item.medium_cover_image} alt={item.title} /></Link>
            </Paper>
          </Grid>)
        ))}
        </Grid>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Catalog.propTypes = {
  items: PropTypes.object,
  fetchItems: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

Catalog.defaultProps = {
  items: {}
};

export default Catalog;
