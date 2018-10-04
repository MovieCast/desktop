import React, { Component } from 'react';

import FrameControls from './FrameControls';
import FrameContent from './FrameContent';

class Frame extends Component {
  render() {
    return (
        <div>
            {/* add title to Redux */}
            <FrameControls  title="Moviecast"/>
            <FrameContent />
        </div>
    );
  }
}

export default Frame;