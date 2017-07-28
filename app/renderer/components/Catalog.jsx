import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Paper } from 'material-ui';

class Catalog extends Component {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            align="flex-start"
            justify="flex-start"
          >
            {_.map(this.props.items, (item =>
              (<Grid key={item.id} item>
                <Paper>
                  <Link to={`/movie/${item.id}`}><img src={item.medium_cover_image} alt={item.title} /></Link>
                </Paper>
              </Grid>)
            ))}
          </Grid>
        </Grid>
      </Grid>
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
