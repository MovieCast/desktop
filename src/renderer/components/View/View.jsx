import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ViewAppBar from './ViewAppBar';
import ViewContent from './ViewContent';

/**
 * View Component
 *
 * This component is the base of all views.
 * A view will, by default, have an AppTitleBar, AppBar and an AppContent component.
 */
export default class View extends Component {
  render() {
    const { config, children } = this.props;

    return [
      <ViewAppBar {...config.appBar} />,

      <ViewContent>
        {children}
      </ViewContent>
    ];
  }
}

View.propTypes = {
  config: PropTypes.shape({
    appBar: PropTypes.shape({
      title: PropTypes.string,
      secondary: PropTypes.string,
      back: PropTypes.bool,
      transparent: PropTypes.bool,
      shadow: PropTypes.bool,
      visible: PropTypes.bool,

      onBackAndDrawerButtonClick: PropTypes.func,
    })
  }),
  children: PropTypes.node.isRequired,
};

View.defaultProps = {
  config: {}
};
