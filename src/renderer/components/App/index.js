import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core';
import FrameContainer from '@/components/Frame';
import withRoot from './withRoot';
import Page from '../Page/Page';
import DashboardPage from '../../pages/DashboardPage';

import MovieIcon from '@material-ui/icons/Movie';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BrushIcon from '@material-ui/icons/Brush';

const styles = {
  html: {
    height: '100%',
    margin: 0
  }
};

class App extends Component {
  render() {
    return (
      <FrameContainer>
        <Page path="/movies" title="Movies" icon={MovieIcon} component={DashboardPage}/>
        <Page path="/" title="Series" icon={OndemandVideoIcon}/>
        <Page title="Anime" icon={BrushIcon}/>
        <Page title="Favourite" icon={FavoriteIcon}/>
      </FrameContainer>
    );
  }
}

export default withRoot(withStyles(styles)(App));