import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

class SettingsCategoryListItem extends Component {
  state = {
    open: false
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, value) => {
    this.setState({ open: false });
    this.props.onOptionsClick(event, index, value);
  };

  getValues() {
    const { values, options } = this.props;
    if (options && !values) {
      return options.map(option => option.toLowerCase());
    }
    return values;
  }

  getSelectedItem() {
    const { options, value } = this.props;

    const values = this.getValues();
    if (values) {
      return options[values.indexOf(value)] || 'Unknown';
    }
    return value;
  }

  render() {
    const { icon, text, value, action, options, onClick } = this.props;

    const values = this.getValues();

    return (
      <div>
        <ListItem
          button={!!onClick || !!options}
          onClick={onClick || this.handleClickListItem}
        >
          <ListItemAvatar>
            <Avatar>
              {icon}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={text}
            secondary={this.getSelectedItem()}
          />
          {action &&
          <ListItemSecondaryAction>
            {action}
          </ListItemSecondaryAction>}
        </ListItem>

        {options &&
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) =>
            (<MenuItem
              key={option}
              selected={values[index] === value}
              onClick={event => this.handleMenuItemClick(event, index, values[index] || option)}
            >
              {option}
            </MenuItem>),
          )}
        </Menu>}
      </div>
    );
  }
}

export default SettingsCategoryListItem;
