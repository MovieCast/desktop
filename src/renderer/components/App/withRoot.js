import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { Provider } from 'react-redux';
import pure from 'recompose/pure';
import wrapDisplayName from 'recompose/wrapDisplayName';
import AppWrapper from 'docs/src/modules/components/AppWrapper';
import initRedux from 'docs/src/modules/redux/initRedux';
import findPages from /* preval */ 'docs/src/modules/utils/findPages';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

function withRoot(BaseComponent) {
  // Prevent rerendering
  const PureBaseComponent = pure(BaseComponent);

  class WithRoot extends React.Component {

    static getInitialProps(ctx) {
      let initialProps = {};
      const redux = initRedux({});

      if (BaseComponent.getInitialProps) {
        const baseComponentInitialProps = BaseComponent.getInitialProps({ ...ctx, redux });
        initialProps = {
          ...baseComponentInitialProps,
          ...initialProps,
        };
      }

      if (process.browser) {
        return initialProps;
      }

      return {
        ...initialProps,
        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        reduxServerState: redux.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.redux = initRedux(this.props.reduxServerState || {});
    }

    redux = null;

    render() {
      return (
        <Provider store={this.redux}>
          <AppWrapper>
            <PureBaseComponent initialProps={this.props} />
          </AppWrapper>
        </Provider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
