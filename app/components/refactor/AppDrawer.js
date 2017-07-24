import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Drawer,
  Divider,
  Typography
} from 'material-ui';

import {
  Movie as MovieIcon,
  Tv as ShowIcon,
  Settings as SettingsIcon
} from 'material-ui-icons';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('AppDrawer', theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
}));

function AppDrawer(props) {
  const classes = props.classes;

  return (
    <Drawer
      classes={{
        paper: classes.paper,
      }}
      open={props.open}
      onRequestClose={props.onRequestClose}
      docked={props.docked}
      keepMounted
    >
      <div className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Typography type="title" color="inherit">
            MovieCast
          </Typography>
          <Divider absolute />
        </Toolbar>

        <List disablePadding>
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
      </div>
    </Drawer>
  );
}

/* eslint-disable react/forbid-prop-types */
AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  docked: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppDrawer);
