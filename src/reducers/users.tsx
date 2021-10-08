import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SOCIAL_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/user-actions-types';
const initialState = {
  userData: {},
  userToken: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      // eslint-disable-next-line no-shadow
      console.warn(
        'inside reduces',
        JSON.stringify(action.payload, undefined, 2),
      );
      let user = action.payload;
      return {
        ...state,
        userToken: user.userToken,
        userData: {...user.data},
      };
    }

    case REGISTER_SUCCESS: {
      // eslint-disable-next-line no-shadow
      console.warn(
        'inside reduces 111',
        JSON.stringify(action.payload, undefined, 2),
      );
      let user = action.payload;
      return {
        ...state,
        userToken: user.userToken,
        userData: {...user.data},
      };
    }

    case SOCIAL_LOGIN_SUCCESS: {
      // eslint-disable-next-line no-shadow
      console.warn(
        'inside reduces 222',
        JSON.stringify(action.payload, undefined, 2),
      );
      let user = action.payload;
      return {
        ...state,
        userToken: user.userToken,
        userData: {...user.data},
      };
    }

    case LOGOUT_SUCCESS: {
      console.warn('logout');
      let user = action.payload;
      return {
        ...state,
        userToken: user.userToken,
        userData: {...user.data},
      };
    }
    default:
      return state;
  }
}
