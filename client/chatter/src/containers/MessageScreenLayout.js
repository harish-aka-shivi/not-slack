import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardDrawer from './ChannelsDrawer';
// import CustomScrollView from './CustomScrollView';
import { toggleMenuOpen } from '../redux/app';
import {
  onWebStyle, onDesktop, BLACK, LIGHT_GRAY,
} from '../styles';

const MessageScreenLayout = ({ ...props }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <MaterialCommunityIcons.Button
          onPress={() => dispatch(toggleMenuOpen())}
          backgroundColor="transparent"
          iconStyle={styles.iconStyle}
          name="menu"
          size={32}
          color={BLACK}
          underlayColor={LIGHT_GRAY}
        />
        <Text style={styles.titleContainer}>
          Not Slack
        </Text>
      </View>
      <View style={styles.body}>
        <DashboardDrawer />
        <View
          style={styles.content}
        >
          <View
            style={styles.contentContainer}
            {...onDesktop({
              paddingLeft: 300,
              opacity: 1,
            })}
            {...props}
          />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    ...onWebStyle({
      height: '100vh',
      overflow: 'hidden',
    }),
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowColor: BLACK,
    shadowOpacity: 0.25,
  },
  body: {
    flex: 1,
  },
  iconStyle: {
  },
  titleContainer: {

  },
});

export default MessageScreenLayout;
