import React, { Component } from 'react';

import FrameControls from './FrameControls';
import FrameLayouts from './FrameLayouts';

class Frame extends Component {
  render() {
    return (
        <div>
            {/* add title to Redux */}
            <FrameControls  title="Moviecast"/>
            <FrameLayouts />
        </div>
    );
  }
}

export default Frame;