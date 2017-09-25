import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Menu, {
  MenuItem
} from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';

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

  render() {
    const { icon, text, value, action, options, onClick } = this.props;

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
            secondary={value}
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
              selected={option === value}
              onClick={event => this.handleMenuItemClick(event, index, option)}
            >
              {option}
            </MenuItem>),
          )}
        </Menu>}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
SettingsCategoryListItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  action: PropTypes.element,
  options: PropTypes.array,
  onClick: PropTypes.func,
  onOptionsClick: PropTypes.func
};
/* eslint-enable react/forbid-prop-types */

SettingsCategoryListItem.defaultProps = {
  icon: null,
  action: null,
  value: null,
  options: null,
  onClick: undefined,
  onOptionsClick: undefined
};

export default SettingsCategoryListItem;
