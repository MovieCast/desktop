import React from 'react';

const Close = props => (
  <svg height="100%" width="100%" shapeRendering="crispEdges" {...props}>
    <line x1="18" y1="7" x2="27" y2="16" stroke="white" />
    <line x1="27" y1="7" x2="18" y2="16" stroke="white" />
  </svg>
);

export default Close;