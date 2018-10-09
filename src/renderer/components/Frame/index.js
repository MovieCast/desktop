import { Container } from 'flux/utils';
import React, { Component } from 'react';
import ElectronStore from '@/stores/ElectronStore';
import ElectronActions from '@/actions/ElectronActions';
import Frame from './Frame';

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
    return <Frame {...this.props} {...this.state} />;
  }
}

export default Container.create(FrameContainer);