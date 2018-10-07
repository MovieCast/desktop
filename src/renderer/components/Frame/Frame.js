import React, { Component } from 'react';

import FrameControls from './FrameControls';
import FrameLayouts from './FrameLayouts';

class Frame extends Component {
  // static propTypes = {
    
  // }

  render() {
    const { electron, minimize, maximize, close } = this.props;

    return (
        <div>
            {/* add title to Redux */}
            <FrameControls electron={electron} minimize={minimize} maximize={maximize} close={close} title="MovieCast"/>
            <FrameContent/>
        </div>
    );
  }
}

export default Frame;