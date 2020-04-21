import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback,
} from 'react-native';
import { IS_ANDROID } from '../config';


const styles = StyleSheet.create({

  button: {
    paddingTop: 8,
    paddingBottom: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  touchable: {
    width: '100%',
  },
});


const CustomButton = ({
  title, textColor, buttonWidth, customStyle = { width: '100%' }, onPress = () => {}, ...props
}) => {
  const ButtonComponent = IS_ANDROID ? TouchableOpacity : TouchableOpacity;
  const background = IS_ANDROID ? TouchableNativeFeedback.SelectableBackground() : '';
  // console.log(customStyle);
  const widthStyle = { width: buttonWidth };
  return (
    <ButtonComponent
      background={background}
      onPress={onPress}
      style={[styles.touchable, customStyle, widthStyle]}
    >
      <View
        style={[styles.button, customStyle]}
        {...props}
      >
        <Text numberOfLines={1} style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </View>
    </ButtonComponent>
  );
};

export default CustomButton;
