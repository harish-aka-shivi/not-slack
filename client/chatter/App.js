import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { IS_DEV, IS_WEB } from './src/config';
import store from './src/redux';
import { WHITE } from './src/styles';
import Login from './src/pages/Authentication/login';
import MessageScreenLayout from './src/containers/MessageScreenLayout';
import RootView from './src/components/RootView';
import AuthLayout from './src/containers/AuthLayout';

console.log(IS_DEV, __DEV__, IS_WEB);

// if (__DEV__) {
//   import('./reactotron').then(() => console.log('Reactotron Configured'));
// }

export default function App() {
  return (
    <Provider
      store={store}
    >
      <RootView style={styles.container}>
        {/* <MessageScreenLayout /> */}
        <AuthLayout>
          <Login />
        </AuthLayout>
      </RootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
