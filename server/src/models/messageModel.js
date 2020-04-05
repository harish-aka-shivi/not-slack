import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
