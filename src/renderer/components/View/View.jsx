import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Movie as MovieIcon,
  Tv as ShowIcon,
  Settings as SettingsIcon,
  OndemandVideo as VideoIcon
} from 'material-ui-icons';

import ViewAppBar from './ViewAppBar';
import ViewDrawer from './ViewDrawer';
import ViewContent from './ViewContent';
import ViewStatusBar from './ViewStatusBar';

import { APP_NAME } from '../../../config';

/**
 * View Component
 *
 * This component is the base of all views.
 * A view will, by default, have an AppTitleBar, AppBar and an AppContent component.
 */
export default class View extends Component {
  state = {
    statusBar: {
      transparent: false,
      visible: true
    },
    appBar: {
      title: '',
      transparent: false,
      shadow: false,
      back: false,
      visible: true,
      onDrawerClick: () => this.setState({ drawer: { ...this.state.drawer, open: true } }),
      onBackClick: () => this.context.router.history.push('/'),
    },

    drawer: {
      title: APP_NAME,
      open: false,
      onRequestClose: () => this.setState({ drawer: { ...this.state.drawer, open: false } }),
      items: [{
        to: '/movies',
        text: 'movies',
        icon: <MovieIcon />
      },
      // }, {
      //   to: '/shows',
      //   text: 'shows',
      //   icon: <ShowIcon />
      // }, {
      {
        to: '/settings',
        text: 'settings',
        icon: <SettingsIcon />
      }],
      // categories: [{
      //   title: 'Demos',
      //   items: [{
      //     to: '/player',
      //     text: 'player',
      //     icon: <VideoIcon />
      //   }]
      // }]
    }
  }

  getChildContext() {
    return {
      // setBarTitle: (title) => this.setState({ title }),
      // setBarTransparency: (transparent) => this.setState({ transparent }),
      // setBarShadow: (shadow) => this.setState({ shadow }),
      // setBarBack: (back) => this.setState({ back }),
      // setBarVisibility: (visible) => this.setState({ visible }),
      setStatusBarConfig: (config) => this.setState({ statusBar: { ...this.state.statusBar, ...config } }),
      setAppBarConfig: (config) => this.setState({ appBar: { ...this.state.appBar, ...config } }),
      setDrawerConfig: (config) => this.setState({ drawer: { ...this.state.drawer, ...config } })
    };
  }

  render() {
    const { render } = this.props;
    return (
      <div>
        <ViewStatusBar {...this.state.statusBar} />
        <ViewAppBar {...this.state.appBar} />
        <ViewDrawer {...this.state.drawer} /> {/* FK, this has to be moved to an upper component :( */}

        <ViewContent hasStatusBar={this.state.statusBar.visible}>
          {render && render()}
        </ViewContent>
      </div>
    );
  }
}

View.propTypes = {
  render: PropTypes.func,
};

View.defaultProps = {
  render: null
};

View.contextTypes = {
  router: PropTypes.object.isRequired
};

View.childContextTypes = {
  setStatusBarConfig: PropTypes.func,
  setAppBarConfig: PropTypes.func,
  setDrawerConfig: PropTypes.func,
};
