import { LOCATION_CHANGE } from 'react-router-redux';
import { CONFIGURE_APP_BAR } from '../actions/application';

import { productName } from '../../package.json';
import { createReducer } from '../util';

const initialState = {
  appBar: {
    title: productName,
    secondary: false,
    transparent: false,
    shadow: false,
    hidden: false,
    back: false
  }
};

export default createReducer(initialState, {
  [CONFIGURE_APP_BAR]: (state, action) => ({
    ...state,
    appBar: {
      ...state.appBar,
      ...action.payload
    }
  }),
  [LOCATION_CHANGE]: (state) => ({
    ...state,
    appBar: initialState.appBar
  })
});
