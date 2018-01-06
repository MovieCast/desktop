import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  List,
  ListSubheader,
  Toolbar,
  Drawer,
  Divider,
  Typography
} from 'material-ui';

import { withStyles } from 'material-ui/styles';
import ViewDrawerNavItem from './ViewDrawerNavItem';

import { APP_NAME } from '../../../config';

const styleSheet = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  fakeNiceBar: {
    height: process.platform !== 'darwin' ? 29 : 22, // Sorry for this hack will be fixed later
    backgroundColor: theme.palette.grey[900]
  }
});

class ViewDrawer extends Component {
  renderItems(items) {
    const { onRequestClose } = this.props;

    return items.map(item => (
      <ViewDrawerNavItem
        key={item.text}
        {...item}
        onClick={onRequestClose}
      />
    ));
  }

  renderCategories(categories) {
    return categories.map(category => (
      <List key={category.title} subheader={<ListSubheader>{category.title}</ListSubheader>}>
        {this.renderItems(category.items)}
      </List>
    ));
  }

  render() {
    const { classes, title, items, categories, open, onRequestClose } = this.props;

    return (
      <Drawer
        classes={{
          paper: classes.paper,
        }}
        open={open}
        onRequestClose={onRequestClose}
        keepMounted={false}
      >
        <div className={classes.nav}>
          <div className={classes.fakeNiceBar} />
          <Toolbar className={classes.toolbar}>
            <Typography type="title" color="inherit">
              {title}
            </Typography>
            <Divider absolute />
          </Toolbar>

          <List disablePadding>
            {this.renderItems(items)}

            <Divider />

            {this.renderCategories(categories)}
          </List>
        </div>
      </Drawer>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ViewDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  items: PropTypes.array,
  categories: PropTypes.array
};
/* eslint-enable react/forbid-prop-types */

ViewDrawer.defaultProps = {
  open: false,
  onRequestClose: () => {},
  title: APP_NAME,
  items: [],
  categories: []
};

export default withStyles(styleSheet)(ViewDrawer);
