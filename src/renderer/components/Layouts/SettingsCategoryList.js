import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

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
    const { header, children } = this.props;

    return (
      <List subheader={header ? <ListSubheader>{header}</ListSubheader> : ''}>
        {children}
      </List>
    );
  }
}
export default SettingsCategoryList;
