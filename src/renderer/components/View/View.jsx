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

/**
 * View Component
 *
 * This component is the base of all views.
 * A view will, by default, have an AppTitleBar, AppBar and an AppContent component.
 */
export default class View extends Component {
  state = {
    appBar: {
      title: 'MovieCast',
      transparent: false,
      shadow: false,
      back: false,
      visible: true,
      onDrawerClick: () => this.setState({ drawer: { ...this.state.drawer, open: true } }),
      onBackClick: () => this.context.router.history.push('/'),
    },

    drawer: {
      title: 'MovieCast',
      open: false,
      onRequestClose: () => this.setState({ drawer: { ...this.state.drawer, open: false } }),
      items: [{
        to: '/movies',
        text: 'Movies',
        icon: <MovieIcon />
      }, {
        to: '/shows',
        text: 'Shows',
        icon: <ShowIcon />
      }, {
        to: '/settings',
        text: 'Settings',
        icon: <SettingsIcon />
      }],
      categories: [{
        title: 'Demos',
        items: [{
          to: '/player',
          text: 'Player',
          icon: <VideoIcon />
        }]
      }]
    }
  }

  getChildContext() {
    return {
      // setBarTitle: (title) => this.setState({ title }),
      // setBarTransparency: (transparent) => this.setState({ transparent }),
      // setBarShadow: (shadow) => this.setState({ shadow }),
      // setBarBack: (back) => this.setState({ back }),
      // setBarVisibility: (visible) => this.setState({ visible }),
      setBarConfig: (config) => this.setState({ appBar: { ...this.state.appBar, ...config } }),
      setDrawerConfig: (config) => this.setState({ drawer: { ...this.state.drawer, ...config } })
    };
  }

  render() {
    const { render } = this.props;
    return (

      <div>
        <ViewAppBar {...this.state.appBar} />
        <ViewDrawer {...this.state.drawer} /> {/* FK, this has to be moved to an upper component :( */}

        <ViewContent>
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
  setBarConfig: PropTypes.func,
  setDrawerConfig: PropTypes.func,
};
