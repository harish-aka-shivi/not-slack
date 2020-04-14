import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';
import io from 'socket.io-client';
import CustomButton from '../components/CustomButton';
import { BLACK } from '../styles';
import CustomScrollView from './CustomScrollView';


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    borderColor: BLACK,
    height: 60,
    borderWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: BLACK,
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  scrollView: {
    flex: 0.8,
  },
});

const channel = 'dummy';
const username = 'shivirana4';

const MessageScreen = () => {
  const [text, setText] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketTemp = io('http://localhost:3000');
    console.log(socketTemp);
    socketTemp.on('message', msg => {
      console.log(msg);
      // this.setState({ chatMessages: [...this.state.chatMessages, msg]
    });
    setSocket(socketTemp);
  }, [setSocket]);

  const handleDoneClicked = () => {
    if (text) {
      socket.emit('sendMessageTemp', { username, channel, content: text });
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={t => setText(t)}
      />
      <CustomButton onPress={handleDoneClicked} style={styles.button} textColor="white" title="Send" back />
      <CustomScrollView style={styles.scrollView} />
    </View>
  );
};

export default MessageScreen;
