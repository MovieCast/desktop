import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import NavListItem from './NavListItem';


import MovieIcon from '@material-ui/icons/Movie';
import SettingsIcon from '@material-ui/icons/Settings';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BrushIcon from '@material-ui/icons/Brush';
import NavExpander from './NavExpander';

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
    position: 'relative',
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
    //paddingLeft: 72,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  noPadding: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowX: 'hidden'
  },
  settings: {
    marginTop: 'auto'
  }
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

  clicked = () => {
    console.log("clicked");
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
                <NavExpander
                  styling={classes.noPadding}
                  open={this.state.open}
                  click={this.handleDrawerToggle}
                />
                
                <Divider/>
                {/* Content */}
                <NavListItem text="Movies" onClick={this.clicked}><MovieIcon/></NavListItem>
                <NavListItem text="Series"><OndemandVideoIcon/></NavListItem>
                <NavListItem text="Anime"><BrushIcon/></NavListItem>
                <NavListItem text="Favourite"><FavoriteIcon/></NavListItem>

                <Divider/>

                <NavListItem text="Settings" className={classes.settings}><SettingsIcon/></NavListItem>
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
