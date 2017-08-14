import React from 'react';
import PropTypes from 'prop-types';

import {
  List,
  Toolbar,
  Drawer,
  Divider,
  Typography
} from 'material-ui';

import {
  Movie as MovieIcon,
  Tv as ShowIcon,
  Settings as SettingsIcon,
  OndemandVideo as VideoIcon
} from 'material-ui-icons';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppDrawerNavItem from './AppDrawerNavItem';

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
          <AppDrawerNavItem
            to="/movies"
            text="Movies"
            icon={<MovieIcon />}
            onClick={props.onRequestClose}
          />
          <AppDrawerNavItem
            to="/shows"
            text="Shows"
            icon={<ShowIcon />}
            onClick={props.onRequestClose}
          />
          <AppDrawerNavItem
            to="/settings"
            text="Settings"
            icon={<SettingsIcon />}
            onClick={props.onRequestClose}
          />

          <Divider />

          <AppDrawerNavItem
            to="/player"
            text="(DEMO) Player"
            icon={<VideoIcon />}
            onClick={props.onRequestClose}
          />
        </List>
      </div>
    </Drawer>
  );
}

/* eslint-disable react/forbid-prop-types */
AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(AppDrawer);
