import { LOCATION_CHANGE } from 'react-router-redux';
import { CONFIGURE_APP_BAR, CONFIGURE_TITLE_BAR } from '../actions/application';

import { productName } from '../../package.json';
import { createReducer } from '../util';

const initialState = {
  appTitleBar: {
    transparent: false,
    hidden: false
  },
  appBar: {
    title: productName,
    secondary: false,
    transparent: false,
    shadow: false,
    hidden: false,
    back: false,
    search: false,
    term: ''
  }
};

export default createReducer(initialState, {
  [CONFIGURE_APP_BAR]: (state, action) => ({
    ...state,
    appBar: {
      ...state.appBar,
      ...action.payload
    },
    appTitleBar: {
      ...state.appTitleBar,
      transparent: action.payload.transparent
    }
  }),
  [CONFIGURE_TITLE_BAR]: (state, action) => ({
    ...state,
    appTitleBar: {
      ...state.appTitleBar,
      ...action.payload
    }
  }),
  [LOCATION_CHANGE]: (state) => ({
    ...state,
    appBar: initialState.appBar
  })
});
