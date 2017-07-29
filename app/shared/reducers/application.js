import { LOCATION_CHANGE } from 'react-router-redux';
import { CONFIGURE_APP_BAR } from '../actions/application';

import { productName } from '../../package.json';

const initialState = {
  appBar: {
    title: productName,
    transparent: false,
    shadow: false,
    back: false
  }
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case CONFIGURE_APP_BAR:
      return {
        ...state,
        appBar: {
          ...initialState.appBar,
          ...action.payload
        }
      };

    // Little trick to reset appbar on route changes
    case LOCATION_CHANGE:
      return {
        ...state,
        appBar: initialState.appBar
      };

    default:
      return state;
  }
}
