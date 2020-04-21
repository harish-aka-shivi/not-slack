import {
  View, StyleSheet, TextInput, Text,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GRAY, SLACK_LOGIN, WHITE, SLACK_ORANGE_ACCENT, TRANSPARENT,
} from '../../styles';
import CustomButton from '../../components/CustomButton';
import { loginAction } from '../../redux/user';

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

const Input = ({
  value, placeholder, secureTextEntry = false, onChangeText,
}) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    inlineImagePadding={8}
    placeholderTextColor="black"
    placeholder={placeholder}
    style={styles.textInput}
  />
);


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (username && password) {
      dispatch(loginAction({ username, password }));
    }
  };

  return (
    <View style={styles.root}>
      <Input
        value={username}
        onChangeText={name => setUsername(name)}
        inlineImagePadding={8}
        placeholder="User name"
      />
      <Input
        value={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholder="Password"
        secureTextEntry
      />
      <CustomButton
        buttonWidth="100%"
        textColor={WHITE}
        title="Login"
        onPress={handleSubmit}
        customStyle={styles.loginButtonStyle}
      />
      <View style={styles.signUpButtonContainer}>
        <Text style={styles.accountText}>
          Don&apos;t have an account?
        </Text>
        <CustomButton
          textColor={SLACK_ORANGE_ACCENT}
          buttonWidth={60}
          customStyle={styles.signUpButton}
          title="Sign up"
        />
      </View>
    </View>
  );
};


export default Login;
