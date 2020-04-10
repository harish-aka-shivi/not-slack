import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SLACK_LIGHT_PRIMARY, DRAWER_WIDTH, onDesktop } from '../styles';
import SlideInView from '../components/SlideInView';
import { getMenuOpen } from '../redux/app';

const ChannelsDrawer = () => {
  const isOpen = useSelector(getMenuOpen);

  return (

    <SlideInView
      style={styles.slideInViewRoot}
      {...onDesktop({ transform: [{ translateX: 0 }], marginLeft: 0 })}
      isOpen={isOpen}
    >
      <View style={styles.contentRoot}>
        <ScrollView>
          <View style={styles.root} />
          {
          // / render the channels here
        }
        </ScrollView>
      </View>
    </SlideInView>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '120%',
    // position: 'absolute',
    left: 0,
    top: 0,
  },

  contentRoot: {
    backgroundColor: SLACK_LIGHT_PRIMARY,
    width: DRAWER_WIDTH,
  },
  slideInViewRoot: {
    backgroundColor: SLACK_LIGHT_PRIMARY,
  },
});

export default ChannelsDrawer;
