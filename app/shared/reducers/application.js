import { CUSTOM_TITLE } from '../actions/application';

const initialState = {
  customTitle: false
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case CUSTOM_TITLE: {
      return {
        ...state,
        customTitle: action.payload
      };
    }

    default:
      return state;
  }
}
