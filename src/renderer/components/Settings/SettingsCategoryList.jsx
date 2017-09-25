import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List, { ListSubheader } from 'material-ui/List';

/**
 * TODO: Find a way to assign some props
 * to the childern
 * @example
 * <SettingsCategoryList>
 *   header="User Interface"
 *   category={this.props.settings.ui}
 *   onChange={this.onCategoryStateChange}
 * >
 *    ...
 * </SettingsCategoryList>
 */
class SettingsCategoryList extends Component {
  render() {
    const { header } = this.props;

    return (
      <List subheader={header ? <ListSubheader>{header}</ListSubheader> : false}>
        {this.props.children}
      </List>
    );
  }
}

SettingsCategoryList.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node
};

SettingsCategoryList.defaultProps = {
  header: null,
  children: null
};

export default SettingsCategoryList;
