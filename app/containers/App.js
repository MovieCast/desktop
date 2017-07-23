import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.objectOf(Children).isRequired
};
