import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  createPalette,
  createMuiTheme,
  MuiThemeProvider
} from 'material-ui/styles';

import AppRouter from './AppRouter';

function App({ store, history }) {
  const theme = createMuiTheme({
    // TODO: Create our own palettes, for so called themes
    palette: createPalette({
      type: 'dark'
    }),

    overrides: {
      MuiToolbar: {
        root: {
          minHeight: 64,
          maxHeight: 64
        }
      },
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter history={history} />
      </Provider>
    </MuiThemeProvider>
  );
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default App;
