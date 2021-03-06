import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import user from './user';
import app from './app';
import packageJSON from '../../package.json';
import storage from '../util/storage';

const middlewares = [thunk];

// if (IS_DEV) {
//   middlewares.push(createLogger({
//     collapsed: true,
//   }));
// }

const persistConfig = {
  key: `chatter-user-${packageJSON.version}`,
  storage,
  whitelist: [],
};

const reducers = {
  user: persistReducer(persistConfig, user),
  app,
};

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);

export default store;
