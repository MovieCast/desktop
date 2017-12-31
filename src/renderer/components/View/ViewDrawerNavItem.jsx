import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui';

export default function ViewDrawerNavItem(props) {
  return (
    <ListItem button component={Link} to={props.to} onClick={props.onClick}>
      {props.icon &&
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>}
      <ListItemText primary={props.text} />
    </ListItem>
  );
}

ViewDrawerNavItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

ViewDrawerNavItem.defaultProps = {
  to: null,
  icon: null,
  onClick: null
};
