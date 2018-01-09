import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
// import AppWrapper from './AppWrapper';
import AppFrame from './AppFrame';
import MoviesCatalog from '../../containers/MoviesCatalog';
import MovieDetail from '../../containers/MovieDetail';
import SettingsPage from '../../containers/SettingsPage';
import Player from '../../containers/Player';

export default function AppRouter({ history }) {
  return (
    <Router history={history}>
      <AppFrame>
        <Switch>
          <Route path="/movie/:id" component={MovieDetail} state={{ title: 'Test' }} />
          <Route path="/movies" component={MoviesCatalog} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/player" component={Player} />

          <Route
            path="/"
            render={() => (
              <Redirect to="movies" />)}
          />
        </Switch>
      </AppFrame>
    </Router>
  );
}

/* eslint-disable react/forbid-prop-types */
AppRouter.propTypes = {
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */
