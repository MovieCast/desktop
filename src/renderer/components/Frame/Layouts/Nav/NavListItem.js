import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

class NavListItem extends React.Component {
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
    const { props } = this;

    return (
      <ListItem button onClick={props.onClick}>
          <ListItemIcon>
              { props.children }
          </ListItemIcon>
          <ListItemText primary={props.text} />
      </ListItem>
    );
  }
}

NavListItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NavListItem;
