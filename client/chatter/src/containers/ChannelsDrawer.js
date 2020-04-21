import React, { useEffect } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  SLACK_LIGHT_PRIMARY, DRAWER_WIDTH, onDesktop, WHITE, SLACK_SELECTED_CHANNEL,
} from '../styles';
import SlideInView from '../components/SlideInView';
import { getMenuOpen } from '../redux/app';
import { getChannels, fetchChannels } from '../redux/messages';
import { useHistory } from './Router';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 32,
    paddingBottom: 32,
    // position: 'absolute',
    top: 0,
  },
  contentRoot: {
    backgroundColor: SLACK_LIGHT_PRIMARY,
    width: DRAWER_WIDTH,
  },
  slideInViewRoot: {
    backgroundColor: SLACK_LIGHT_PRIMARY,
  },
  channelContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selectedChannelContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: SLACK_SELECTED_CHANNEL,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textStyle: {
    color: WHITE,
  },
});

const ChannelsDrawer = () => {
  const isOpen = useSelector(getMenuOpen);
  const channels = useSelector(getChannels);

  const dispatch = useDispatch();
  const navigation = useHistory();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <SlideInView
      style={styles.slideInViewRoot}
      {...onDesktop({ transform: [{ translateX: 0 }], marginLeft: 0 })}
      isOpen={isOpen}
    >
      <View style={styles.contentRoot}>
        {/* <ScrollView> */}
        <View style={styles.root}>
          {
            channels.map(channel => {
              const path = navigation.location.pathname;
              const channelPath = `/${channel.name}`;
              const active = path === channelPath;
              return (
                <TouchableOpacity onPress={() => {
                  navigation.push(channelPath);
                }}
                >
                  <View
                    style={active ? styles.selectedChannelContainer : styles.channelContainer}
                  >
                    <Text
                      style={styles.textStyle}
                    >
                      {channel.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
        }
        </View>
        {/* </ScrollView> */}
      </View>
    </SlideInView>
  );
};

export default ChannelsDrawer;
