import {HIDE_LOADER, SHOW_LOADER} from '../actions/app-actions-types';

const initialState = {
  loading: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };

    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
