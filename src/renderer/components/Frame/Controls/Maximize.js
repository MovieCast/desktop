import React from 'react';
import PropTypes from 'prop-types';

const Maximize = ({ isMaximized, ...props }) => {
  if (!isMaximized) {
    return (
      <svg height="100%" width="100%" shapeRendering="crispEdges" {...props}>
        <rect x="18" y="8" width="9" height="9" stroke="white" fill="none" />
      </svg>
    );
  }
  return (
    <svg height="100%" width="100%" shapeRendering="crispEdges" {...props}>
      <rect x="17" y="11" width="8" height="8" stroke="white" fill="none" />
      <line x1="19" y1="9" x2="19" y2="7" stroke="white" />
      <line x1="19" y1="7" x2="27" y2="7" stroke="white" />
      <line x1="27" y1="7" x2="27" y2="15" stroke="white" />
      <line x1="27" y1="15" x2="25" y2="15" stroke="white" />
    </svg>
  );
};

Maximize.propTypes = {
  isMaximized: PropTypes.bool
};

Maximize.defaultProps = {
  isMaximized: false
};

export default Maximize;
