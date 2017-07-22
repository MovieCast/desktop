// @flow
import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import OsControls from '../containers/OsControls';
import * as styles from './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <AppBar
        className={styles.draggable}
        title="MovieCast"
        iconElementRight={<OsControls />}
      />
    );
  }
}
