import User from '../models/userModel';

const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error in login api');
  }
};

const userCreate = async (req, res) => {
  const user = new User(req.body);
  try {
    const userReaded = await User.findOne({ username: user.username });
    if (userReaded) {
      res.send({ error: 'username already exists' });
    } else {
      await user.save();
      const token = await user.generateAuthToken();
      res.send({ user, token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Error in creating user');
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send({ message: 'logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const deleteUser = (req, res) => {
  try {
    req.user.remove();
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const joinChannel = async (username, channel) => {
  try {
    await User.joinChannel(username, channel);
  } catch (error) {
    console.log(error);
  }
};

const leaveChannel = async (username, channel) => {
  try {
    await User.leaveChannel(username, channel);
  } catch (error) {
    console.log(error);
  }
};

export {
  userLogin,
  userCreate,
  logoutUser,
  deleteUser,
  joinChannel,
  leaveChannel,
};
