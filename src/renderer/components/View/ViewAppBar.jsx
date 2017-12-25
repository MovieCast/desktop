/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from 'material-ui';
import { Menu as MenuIcon, ArrowBack as BackIcon } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    transition: theme.transitions.create(['box-shadow', 'opacity']),
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  noShadow: {
    boxShadow: 'none',
  },
  hidden: {
    opacity: 0
  },

  grow: {
    flex: '1 1 auto',
  },
  title: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 24,
    flex: '0 1 auto',
  },
  titleSecondary: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
});

class ViewAppBar extends Component {
  render() {
    const {
      title, secondary, back, transparent, shadow,
      visible, onBackAndDrawerButtonClick, classes } = this.props;

    const appBarClassName = classNames(classes.appBar, {
      [classes.transparent]: transparent,
      [classes.noShadow]: !shadow,
      [classes.hidden]: !visible
    });

    return (
      <AppBar className={appBarClassName} position="absolute">
        <Toolbar>
          <IconButton
            color="contrast"
            onClick={onBackAndDrawerButtonClick}
          >
            {back ? <BackIcon /> : <MenuIcon />}
          </IconButton>
          <div className={classes.title}>
            <Typography type="title" color="inherit" noWrap gutterBottom={!!secondary}>
              {title}
            </Typography>
            {secondary &&
            <Typography type="caption" color="secondary" className={classes.appBarTitleSecondary}>
              {secondary}
            </Typography>}
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    );
  }
}

ViewAppBar.propTypes = {
  title: PropTypes.string,
  secondary: PropTypes.string,
  back: PropTypes.bool,
  transparent: PropTypes.bool,
  shadow: PropTypes.bool,
  visible: PropTypes.bool,

  onBackAndDrawerButtonClick: PropTypes.func,

  classes: PropTypes.object.isRequired
};

ViewAppBar.defaultProps = {
  title: 'MovieCast',
  secondary: null,
  back: false,
  transparent: false,
  shadow: true,
  visible: true,

  onBackAndDrawerButtonClick: () => {}
};

export default withStyles(styles)(ViewAppBar);
