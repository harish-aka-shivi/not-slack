import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { BLACK, MEDIUM_GRAY } from '../styles';
import CustomScrollView from './CustomScrollView';
import { useHistory } from './Router';
import { getUserName } from '../redux/user';
import { getSocket } from '../redux/app';
import { getMessagesForChannel, appendMessages } from '../redux/messages';


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    borderColor: MEDIUM_GRAY,
    height: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
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
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingBottom: 16,
  },
});

// const channel = 'dummy';
// const username = 'shivirana4';

const MessageScreen = () => {
  const socket = useSelector(getSocket);
  const [text, setText] = useState('');
  // const [socket, setSocket] = useState(null);
  const navigation = useHistory();
  const channel = navigation.location.pathname.split('/')[1];
  const username = useSelector(getUserName);
  const messages = useSelector(getMessagesForChannel(channel));
  const dispatch = useDispatch();

  console.log(messages);

  // join channel
  useEffect(() => {
    if (socket) {
      socket.emit('join', { channel, username }, () => {
        console.log('channel joined');
      });
      socket.on('message', options => {
        dispatch(appendMessages(channel,
          {
            username: options.username,
            channel: options.channel,
            content: options.content,
          }));
      });
    }
  }, [channel, socket]);


  const handleDoneClicked = () => {
    if (text) {
      socket.emit('sendMessage', { username, channel, content: text });
    }
  };

  return (
    <View style={styles.root}>
      <CustomScrollView style={styles.scrollView} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={t => setText(t)}
        />
        <CustomButton onPress={handleDoneClicked} style={styles.button} textColor="white" title="Send" back />
      </View>
    </View>
  );
};

export default MessageScreen;
