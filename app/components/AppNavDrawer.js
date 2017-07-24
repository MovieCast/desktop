import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui';
import {
  Movie as MovieIcon,
  Tv as ShowIcon,
  Settings as SettingsIcon
} from 'material-ui-icons';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('AppNavDrawer', {
  paper: {
    top: 64
  },
  list: {
    width: 250,
    flex: 'initial',
  }
});

class AppNavDrawer extends Component {
  render() {
    const { classes, open, onRequestClose, onClick } = this.props;
    return (
      <div>
        <Drawer
          open={open}
          docked
          onClick={onClick}
          onRequestClose={onRequestClose}
        >
          <List className={classes.list} disablePadding>
            <ListItem button component={Link} to="/movies">
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText primary="Movies" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShowIcon />
              </ListItemIcon>
              <ListItemText primary="Shows" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
AppNavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppNavDrawer);
