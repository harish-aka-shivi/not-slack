import React, { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { IS_DEV, IS_WEB } from './src/config';
import store, { persistor } from './src/redux';
import { WHITE } from './src/styles';
import Login from './src/pages/Authentication/login';
import RootView from './src/components/RootView';
import AuthLayout from './src/containers/AuthLayout';
import Home from './src/pages/Home';
import { isUserLoggedIn } from './src/redux/user';
import {
  Router, Switch, Route, Redirect,
} from './src/containers/Router';
import AuthenticateRedirect from './src/containers/AuthenticateRedirect';
import MessageScreenLayout from './src/containers/MessageScreenLayout';
import { setSocket } from './src/redux/app';

// console.log(IS_DEV, __DEV__, IS_WEB);
// if (__DEV__) {
//   import('./reactotron').then(() => console.log('Reactotron Configured'));
// }

const routes = {
  LOGIN: {
    path: '/login',
    exact: true,
  },
  Home: {
    path: '/:channel',
    exact: true,
  },
};

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSocket());
  }, []);
  const isLoggedIn = useSelector(isUserLoggedIn);
  return (
    <Router>
      <AuthenticateRedirect />
      <RootView style={styles.container}>
        {
          !isLoggedIn
          && (
            <Switch>
              <AuthLayout>
                <Route {...routes.LOGIN}>
                  <Login />
                </Route>
              </AuthLayout>
            </Switch>
          )
        }
        {
          isLoggedIn && (
            <MessageScreenLayout>
              <Switch>
                <Route {...routes.Home}>
                  <Home />
                </Route>
                <Redirect to="/public" />
              </Switch>
            </MessageScreenLayout>
          )
        }
      </RootView>
    </Router>
  );
};

export default function App() {
  return (
    <Provider
      store={store}
    >
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
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
