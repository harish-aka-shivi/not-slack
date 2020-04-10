const TOGGLE_MENU_OPEN = 'APP/TOGGLE_MENU_OPEN';

// actions
const INITIAL_STATE = {
  isMenuOpen: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return {
        ...INITIAL_STATE,
      };
  }
};

// action creators
export const toggleMenuOpen = () => ({
  type: TOGGLE_MENU_OPEN,
});

// selector
export const getMenuOpen = state => state.app.isMenuOpen;


export default reducer;
