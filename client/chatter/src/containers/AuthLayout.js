import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MAX_WIDTH_RESPONSIVE } from '../config';
import {
  BLACK,
} from '../styles';

const AuthLayout = props => (
  <View style={styles.rootContainer}>
    <View
      style={styles.root}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  root: {
    width: '100%',
    alignItems: 'center',
    minHeight: 300,
    maxWidth: MAX_WIDTH_RESPONSIVE,
    padding: 32,
    paddingTop: 48,
    paddingBottom: 48,
    borderRadius: 4,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    // elevation: 2,
    // width: '100%',

  },
});

export default AuthLayout;
