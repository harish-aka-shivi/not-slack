import { IS_WEB } from '../config';

const storage = IS_WEB ? require('redux-persist/lib/storage').default
  : require('react-native').AsyncStorage;

export default storage;
