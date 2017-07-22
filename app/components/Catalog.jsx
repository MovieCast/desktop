import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Catalog extends Component {
  // rip me atm
  componentWillMount() {
    this.props.fetchMovies();
  }

  renderItems() {
    return _.map(this.props.items, item => <div key={item.id}>{item.name}</div>);
  }

  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    );
  }
}

Catalog.propTypes = {
  items: PropTypes.object.isRequired,
  fetchMovies: PropTypes.func.isRequired
};

export default Catalog;
