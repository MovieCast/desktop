import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MovieIcon from '@material-ui/icons/Movie';
import SettingsIcon from '@material-ui/icons/Settings';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import FavoriteIcon from '@material-ui/icons/Favorite';

import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    top: 23,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 6,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 11px',
    ...theme.mixins.toolbar,
  },
  content: {
    paddingLeft: 72,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  noPadding: {
    padding: 0
  },
});

class NavLayout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
            {/* TODO: elements */}
            <List component="nav" className={classes.noPadding}>
                <List className={classes.noPadding}>
                  <ListItem button onClick={this.handleDrawerToggle}>
                      <ListItemIcon>
                        {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                      </ListItemIcon>
                    <ListItemText primary="Moviecast" />
                  </ListItem>
                </List>
                <Divider/>
                {/* Content */}
                <ListItem button>
                  <ListItemIcon>
                      <MovieIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Movies" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                      <OndemandVideoIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Series" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                      <FavoriteIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Favourite" />
                </ListItem>

                <Divider/>

                {/* Settings */}
                <ListItem button>
                  <ListItemIcon>
                      <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
        <main className={classes.content}>
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    );
  }
}

NavLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavLayout);
