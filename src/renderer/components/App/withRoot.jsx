/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';

import pure from 'recompose/pure';
import { Provider } from 'react-redux';

import AppWrapper from './AppWrapper';

function withRoot(BaseComponent) {
  const PureBaseComponent = pure(BaseComponent);

  class WithRoot extends Component {
    render() {
      const { store, history } = this.props;
      return (
        <Provider store={store}>
          <AppWrapper history={history}>
            <PureBaseComponent {...this.props} />
          </AppWrapper>
        </Provider>
      );
    }
  }

  WithRoot.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
