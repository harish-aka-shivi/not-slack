import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageScreen from '../../containers/MessageScreen';
import { fetchMessagesForChannel } from '../../redux/messages';

// authenticate

// get all channels, show in menu
// join channel which are joined for a db

// if there is a message show it with notification

// fetch messages for each channel

const Home = () => {
  const dispatch = useDispatch();
  const { channel } = useParams();

  useEffect(() => {
    dispatch(fetchMessagesForChannel(channel));
  }, []);

  return (
    <MessageScreen />
  );
};

export default Home;
