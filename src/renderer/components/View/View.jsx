import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ViewAppBar from './ViewAppBar';
import ViewContent from './ViewContent';

export const VIEW_CONTEXT_TYPES = {
  setBarTitle: PropTypes.func,
  setBarTransparency: PropTypes.func,
  setBarShadow: PropTypes.func,
  setBarBack: PropTypes.func,
  setBarVisibility: PropTypes.func
};

/**
 * View Component
 *
 * This component is the base of all views.
 * A view will, by default, have an AppTitleBar, AppBar and an AppContent component.
 */
export default class View extends Component {
  state = {
    // appBar: {
    title: 'MovieCast',
    transparent: false,
    shadow: false,
    back: false,
    visible: true
    // }
  }

  getChildContext() {
    return {
      setBarTitle: (title) => this.setState({ title }),
      setBarTransparency: (transparent) => this.setState({ transparent }),
      setBarShadow: (shadow) => this.setState({ shadow }),
      setBarBack: (back) => this.setState({ back }),
      setBarVisibility: (visible) => this.setState({ visible })
    };
  }

  render() {
    const { render } = this.props;
    return (

      <div>
        <ViewAppBar {...this.state} />

        <ViewContent>
          {render()}
        </ViewContent>
      </div>
    );
  }
}

View.propTypes = {
  render: PropTypes.func.isRequired,
};

View.childContextTypes = {
  ...VIEW_CONTEXT_TYPES
};
