import React, { Component } from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default class NavExpander extends Component {
  render() {
    return (
        <ListItem button onClick={this.props.click}>
          <ListItemIcon>
            {this.props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
          <ListItemText primary="MovieCast" />
        </ListItem>
    );
  }
}