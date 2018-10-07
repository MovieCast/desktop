import { Container } from 'flux/utils';
import React, { Component } from 'react';
import ElectronStore from '../stores/ElectronStore';
import ElectronActions from '../actions/ElectronActions';
import Frame from '../components/Frame/Frame';

class FrameContainer extends Component {
  static getStores() {
    return [ElectronStore];
  }

  static calculateState(prevState) {
    return {
      electron: ElectronStore.getState(),

      minimize: ElectronActions.minimize,
      maximize: ElectronActions.maximize,
      close: ElectronActions.close
    }
  }

  render() {
    return <Frame {...this.state} />;
  }
}

export default Container.create(FrameContainer);