import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
    const { className, text, icon, to, onClick } = this.props;

    return (
      <Route
        path={to}
        exact={true}
        children={({ match }) => (
          <ListItem button component={Link} className={className} to={to} selected={!!match} onClick={onClick}>
            <ListItemIcon>
              { React.createElement(icon) }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )}
      />
      
    );
  }
}

NavListItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.func,
  className: PropTypes.string
};

NavListItem.defaultProps = {
  to: "#"
}

export default NavListItem;
