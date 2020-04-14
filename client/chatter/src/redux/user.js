import promiseAction from './promiseAction';
import apiFetch, { REST_METHODS } from './call';

const INITIAL_STATE = {
  isLoggedIn: false,
  token: '',
  loaders: {
    login: false,
    registration: false,
  },
  errors: {
    login: undefined,
    registration: undefined,
  },
  username: '',
  userData: '',
};

// actions types
const LOGIN_START = 'APP/USER/LOGIN_START';
const LOGIN_SUCCESS = 'APP/USER/LOGIN_SUCCESS';
const LOGIN_ERROR = 'APP/USER/LOGIN_ERROR';

// const REGISTRATION_START = 'APP/USER/REGISTRATION_START';
// const REGISTRATION_SUCCESS = 'APP/USER/REGISTRATION_SUCCESS';
// const REGISTRATION_ERROR = 'APP/USER/REGISTRATION_ERROR';

const reducer = (state, action) => {
  switch (action.type) {
    case [LOGIN_START]: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          login: true,
        },
      };
    }
    case [LOGIN_SUCCESS]: {
      console.log('login success');
      return {
        ...state,
        loaders: {
          ...state.loaders,
          login: false,
        },
        errors: {
          ...state.errors,
          login: null,
        },
        isLoggedIn: true,
        token: action.payload.token,
        userData: action.payload.user,
      };
    }
    case [LOGIN_ERROR]: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          login: false,
        },
        errors: {
          ...state.errors,
          login: false,
        },
      };
    }
    default:
      return INITIAL_STATE;
  }
};


// actions
export const loginAction = ({ username, password }) => dispatch => dispatch(promiseAction({
  types: [LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR],
  promiseCreator: dispatchInternal => dispatchInternal(apiFetch({
    doAuth: false,
    endpoint: '/users/login',
    method: REST_METHODS.POST,
    mode: 'no-cors',
    body: {
      username,
      password,
    },
  })),
}));

// selectors
export const isUserLoggedIn = state => !!state.user.token;

export default reducer;
