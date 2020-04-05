import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { JSON_WEB_SECRET_KEY } from '../config';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JSON_WEB_SECRET_KEY);

    // TODO: Add time factor.
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'please authenticate' });
  }
};

export default auth;
