/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';
import {
  BLACK, WHITE, useResponsiveParamsFromProps, DRAWER_WIDTH,
} from '../styles';

export const DIRECTIONS = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const s = StyleSheet.create({
  root: {
    width: DRAWER_WIDTH,
    position: 'absolute',
    height: '100%',
    backgroundColor: WHITE,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 4,
    shadowColor: BLACK,
    shadowOpacity: 0.25,
    zIndex: 2,
  },
});

class SlideInView extends React.Component {
  closedDistance = 0;

  openedDistance = DRAWER_WIDTH;

  distance = new Animated.Value(this.props.isOpen ? this.openedDistance : this.closedDistance);

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      Animated.timing(this.distance, {
        toValue: this.props.isOpen ? this.openedDistance : this.closedDistance,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View
        {...useResponsiveParamsFromProps(this.props)}
        style={[
          {
            marginLeft: -DRAWER_WIDTH,
            transform: [{
              translateX: this.distance,
            }],
          },
          s.root,
          this.props.style,
        ]}
      >
        <View children={this.props.children} />
      </Animated.View>
    );
  }
}

SlideInView.defaultProps = {
  direction: DIRECTIONS.LEFT,
  isOpen: false,
  style: {},
};

SlideInView.propTypes = {
  direction: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any,
};

export default SlideInView;
