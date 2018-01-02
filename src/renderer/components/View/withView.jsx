import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import View from './View';

/**
 * A public higher-order component to access the imperative API
 */
const withView = (Component) => {
  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <View render={() => (
        <Component {...remainingProps} ref={wrappedComponentRef} />
      )}
      />
    );
  };

  C.displayName = `withView(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func
  };

  C.defaultProps = {
    wrappedComponentRef: null
  };

  return hoistStatics(C, Component);
};

export default withView;
