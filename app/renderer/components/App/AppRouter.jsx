import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppUI from '../../containers/AppUI';
import AppFrame from '../../containers/AppFrame';
import AppContent from './AppContent';
import MoviesCatalog from '../../containers/MoviesCatalog';
import MovieDetail from '../../containers/MovieDetail';
import SettingsPage from '../../containers/SettingsPage';

export default function AppRouter({ history }) {
  return (
    <Router history={history}>
      <AppUI>
        <AppFrame>
          <AppContent>
            <Switch>
              <Route path="/movie/:id" component={MovieDetail} />
              <Route path="/movies" component={MoviesCatalog} />
              <Route path="/settings" component={SettingsPage} />

              <Route
                path="/"
                render={() => (
                  <Redirect to="movies" />
              )}
              />
            </Switch>
          </AppContent>
        </AppFrame>
      </AppUI>
    </Router>
  );
}

/* eslint-disable react/forbid-prop-types */
AppRouter.propTypes = {
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */
