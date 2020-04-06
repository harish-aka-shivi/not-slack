/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JSON_WEB_SECRET_KEY, SALT_WORK_FACTOR } from '../config';

// TODO: handle password, don't save token.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: [{
      token: {
        type: String,
        required: true,
      },
    }],
  },
  channels: {
    type: [
      String,
    ],
    default: ['public'],
  },
}, {
  timestamps: true,
});

userSchema.methods.toJSON = function toJSON() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject._id;
  delete userObject.createdAt;
  delete userObject.__v;
  delete userObject.tokens;
  return userObject;
};

userSchema.statics.findByCredentials = async function findByCredentials(username, password) {
  const user = await this.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await this.comparePassword(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Credentials not right');
  }
  return user;
};

userSchema.statics.leaveChannel = async function leaveChannel(username, channel) {
  const user = await this.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  const channels = user.channels.slice();
  const indexOfChannel = channels.indexOf(channel);
  if (indexOfChannel !== -1) {
    channels.splice(indexOfChannel, 1);
  }

  user.channels = channels;
  await user.save();
};

userSchema.statics.joinChannel = async function joinChannel(username, channel) {
  const user = await this.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  const channels = user.channels.slice();

  if (!channels.includes(channel)) {
    channels.push(channels);
  }

  user.channels = channels;
  await user.save();
};

userSchema.pre('save', async function hashAndSavePassword(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  }
  next();
});

userSchema.statics.comparePassword = async function comparePassword(candidatePassword, storedHash) {
  return bcrypt.compare(candidatePassword, storedHash);
};

userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;
  const token = jwt
    .sign({ _id: user._id.toString() }, JSON_WEB_SECRET_KEY);
  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();
  return token;
};

userSchema.methods.addChannel = async function addChannel(channel) {
  const user = this;
  user.channels = user.channels.concat(channel);
  await user.save();
  return user.channels;
};


const User = mongoose.model('User', userSchema);
export default User;
