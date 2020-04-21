import promiseAction from './promiseAction';
import apiFetch, { REST_METHODS } from './call';

const INITIAL_STATE = {
  channels: [],
  loaders: {
    channels: false,
  },
  errors: {
    channels: null,
  },
  channelMessages: {

  },
};

export const CHANNEL_FETCH_START = 'MESSAGES/CHANNEL_FETCH_START';
export const CHANNEL_FETCH_SUCCESS = 'MESSAGES/CHANNEL_FETCH_SUCCESS';
export const CHANNEL_FETCH_ERROR = 'MESSAGES/CHANNEL_FETCH_ERROR';

export const CHANNEL_MESSAGES_FETCH_START = 'MESSAGES/CHANNEL_MESSAGES_FETCH_START';
export const CHANNEL_MESSAGES_FETCH_SUCCESS = 'MESSAGES/CHANNEL_MESSAGES_FETCH_SUCCESS';
export const CHANNEL_MESSAGES_FETCH_ERROR = 'MESSAGES/CHANNEL_MESSAGES_FETCH_ERROR';

export const SET_SELECTED_CHANNEL = 'MESSAGES/SET_SELECTED_CHANNELS';
export const APPEND_MESSAGES = 'MESSAGES/APPEND_MESSAGES';

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANNEL_FETCH_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          channels: true,
        },
      };
    }
    case CHANNEL_FETCH_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          channels: false,
        },
        errors: {
          ...state.errors,
          channels: null,
        },
        channels: action.payload.channels,
      };
    }
    case CHANNEL_FETCH_ERROR: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          channels: false,
        },
        errors: {
          ...state.errors,
          channels: false,
        },
      };
    }
    case CHANNEL_MESSAGES_FETCH_SUCCESS: {
      console.log(state, action);
      return {
        ...state,
        channelMessages: {
          ...state.channelMessages,
          [action.channel]: action.payload,
        },
      };
    }
    case APPEND_MESSAGES: {
      return {
        ...state,
        channelMessages: {
          ...state.channelMessages,
          [action.channel]: [...state.channelMessages[action.channel], action.message],
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const appendMessages = (channel, message) => ({
  type: APPEND_MESSAGES,
  channel,
  message,
});

export const fetchMessagesForChannel = channel => dispatch => dispatch(promiseAction({
  types: [
    CHANNEL_MESSAGES_FETCH_START, CHANNEL_MESSAGES_FETCH_SUCCESS, CHANNEL_MESSAGES_FETCH_ERROR,
  ],
  promiseCreator: dispatchInternal => dispatchInternal(apiFetch({
    doAuth: true,
    endpoint: `/message/${channel}`,
    method: REST_METHODS.GET,
    mode: 'no-cors',
  })),
  channel,
}));

export const setSelectedChannel = channel => ({
  type: SET_SELECTED_CHANNEL,
  channel,
});

export const fetchChannels = () => dispatch => dispatch(promiseAction({
  types: [CHANNEL_FETCH_START, CHANNEL_FETCH_SUCCESS, CHANNEL_FETCH_ERROR],
  promiseCreator: dispatchInternal => dispatchInternal(apiFetch({
    doAuth: true,
    endpoint: '/channels',
    method: REST_METHODS.GET,
    mode: 'no-cors',
  })),
}));

// selectors
export const getChannels = state => state.messages.channels;
export const getMessagesForChannel = channel => state => state.messages.channelMessages[channel];

export default reducer;
