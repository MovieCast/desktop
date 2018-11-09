import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import SettingsIcon from '@material-ui/icons/Settings';

import NavExpander from './Nav/NavExpander';
import NavListItem from './Nav/NavListItem';

import Settings from './Settings';


//import Page from '../../../Page/Page';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerPaper: {
    position: 'absolute',
    overflowX: 'hidden',
    width: 240,
    border: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 9,
  },
  nav: {
    padding: 0,
    display: 'flex',
    flexDirection: 'inherit',
    flexGrow: 1,
    position: 'relative'
  },
  settings: {
    marginTop: 'auto'
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 9
  }
});

class NavLayout extends React.Component {
  state = {
    open: false,
    showSettings: false
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  renderNavListItems() {
    const { items } = this.props;
    return items.map(item => (
      <NavListItem key={item.text} text={item.text} icon={item.icon} to={item.path}/>
    ));
  }

  openSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }

  render() {
    const { classes, children } = this.props;

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
            <List component="nav" className={classes.nav} >
                <NavExpander
                  open={this.state.open}
                  click={this.handleDrawerToggle}
                />
                
                <Divider/>
                {this.renderNavListItems()}
                <Divider/>

                <NavListItem text="Settings" icon={SettingsIcon} className={classes.settings} onClick={this.openSettings} selected={this.state.showSettings}/>
            </List>
        </Drawer>

        <div className={classes.content}>
          {children}
              <Settings open={this.state.showSettings}/>
        </div>
      </div>
    );
  }
}

NavLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavLayout);
