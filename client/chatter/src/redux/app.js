import io from 'socket.io-client';

const TOGGLE_MENU_OPEN = 'APP/TOGGLE_MENU_OPEN';
const SET_SOCKET = 'APP/SET_SOCKET';

// actions
const INITIAL_STATE = {
  isMenuOpen: true,
  socket: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MENU_OPEN: {
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    }
    case SET_SOCKET: {
      return {
        ...state,
        socket: action.socket,
      };
    }
    default: {
      return state;
    }
  }
};

// action creators
export const toggleMenuOpen = () => ({
  type: TOGGLE_MENU_OPEN,
});

export const setSocket = () => dispatch => {
  const socket = io('http://localhost:3000');
  dispatch({
    type: SET_SOCKET,
    socket,
  });
};

// selector
export const getMenuOpen = state => state.app.isMenuOpen;
export const getSocket = state => state.app.socket;

export default reducer;
