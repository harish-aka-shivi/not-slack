import { getAllChannels } from '../models/channels';

const getAllChannelsFromDb = (req, res) => {
  res.send({
    channels: getAllChannels(),
  });
};

export {
  getAllChannelsFromDb,
};
