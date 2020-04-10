import {
  View, StyleSheet, TextInput, Text,
} from 'react-native';
import React from 'react';
import {
  GRAY, SLACK_LOGIN, WHITE, SLACK_ORANGE_ACCENT, TRANSPARENT,
} from '../../styles';
import CustomButton from '../../components/CustomButton';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    maxWidth: 450,
  },
  textInput: {
    borderColor: GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
    width: '100%',
    marginTop: 4,
    marginBottom: 4,
    height: 52,
  },
  loginButtonStyle: {
    marginTop: 8,
    height: 52,
    backgroundColor: SLACK_LOGIN,
  },
  signUpButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    padding: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: TRANSPARENT,
    marginLeft: 8,
  },
  accountText: {
    textAlign: 'center',
  },
});

const Input = ({ placeholder, secureTextEntry = false }) => (
  <TextInput secureTextEntry={secureTextEntry} inlineImagePadding={8} placeholderTextColor="black" placeholder={placeholder} style={styles.textInput} />
);


const Register = () => (
  <View style={styles.root}>
    <Input inlineImagePadding={8} placeholder="User name" />
    <Input placeholder="Password" secureTextEntry />
    <CustomButton
      buttonWidth="100%"
      textColor={WHITE}
      title="Register"
      customStyle={styles.loginButtonStyle}

    />
    <View style={styles.signUpButtonContainer}>
      <Text style={styles.accountText}>
        Already a user
      </Text>
      <CustomButton
        textColor={SLACK_ORANGE_ACCENT}
        buttonWidth={60}
        customStyle={styles.signUpButton}
        title="Login"
      />
    </View>
  </View>
);


export default Register;
