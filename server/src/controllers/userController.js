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
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send('Error in creating user');
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send();
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


export {
  userLogin,
  userCreate,
  logoutUser,
  deleteUser,
};
