const INITIAL_STATE = {
  isLoggedIn: false,
  token: '',
  loader: {
    login: false,
    registration: false,
  },
  errors: {
    login: undefined,
    registration: undefined,
  },
};

// actions types
const LOGIN_START = 'APP/USER/LOGIN_START';
// const LOGIN_SUCCESS = 'APP/USER/LOGIN_SUCCESS';
// const LOGIN_ERROR = 'APP/USER/LOGIN_ERROR';

// const REGISTRATION_START = 'APP/USER/REGISTRATION_START';
// const REGISTRATION_SUCCESS = 'APP/USER/REGISTRATION_SUCCESS';
// const REGISTRATION_ERROR = 'APP/USER/REGISTRATION_ERROR';

// const LOGOUT_START = 'APP/USER/LOGOUT_START';
export const LOGOUT_SUCCESS = 'APP/USER/LOGOUT_SUCCESS';
// const LOGOUT_ERROR = 'APP/USER/LOGOUT_ERROR';

const reducer = (state, action) => {
  switch (action.type) {
    case [LOGIN_START]: {
      return {
        ...state,
      };
    }
    default:
      return INITIAL_STATE;
  }
};


// actions
export default reducer;
