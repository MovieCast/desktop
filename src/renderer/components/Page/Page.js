import React, { Component, Fragment } from "react";

import { Route } from 'react-router-dom';

export default class Page extends Component {
  render() {
    const { path, title, component, isSelected } = this.props;

    return (
      <Route path={path} component={component} />
    );
  }
}