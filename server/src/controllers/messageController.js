import Message from '../models/messageModel';

const saveMessage = async ({ username, channel, content }) => {
  const message = new Message({
    username,
    channel,
    content,
  });
  try {
    await message.save();
  } catch (error) {
    console.log('error in saving', error);
  }
};

const getAllMessagesForChannel = async (req, res) => {
  const { channel } = req.params;
  try {
    const messages = await Message.find({ channel });
    console.log(messages);
    res.send(messages);
  } catch (error) {
    console.log(error);
  }
};

export {
  saveMessage,
  getAllMessagesForChannel,
};
