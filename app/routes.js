import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import MoviesCatalog from './containers/MoviesCatalog';

export default () => (
  <App>
    <Switch>
      <Route path="/movies" component={MoviesCatalog} />
      <Route
        path="/"
        render={() => (
          <Redirect to="movies" />
        )}
      />
    </Switch>
  </App>
);
