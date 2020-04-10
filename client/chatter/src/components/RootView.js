import React from 'react';
import {
  View, KeyboardAvoidingView, SafeAreaView, StyleSheet, StatusBar, Platform,
} from 'react-native';
import { IS_WEB } from '../config';


const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

const MobileView = props => (
  <>
    <StatusBar barStyle="light-content" />
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? undefined : 'padding'} style={s.container}>
      <SafeAreaView style={s.container}>
        <View {...props} style={s.content} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  </>
);

const RootView = props => (
  IS_WEB
    ? <View {...props} style={s.content} />
    : <MobileView {...props} />
);

export default RootView;
