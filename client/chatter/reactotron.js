// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';
import storage from './src/util/storage';

Reactotron
  .setAsyncStorageHandler(storage)
  .configure({ host: '192.168.0.46' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
