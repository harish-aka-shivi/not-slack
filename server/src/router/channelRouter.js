import express from 'express';
import auth from '../middlewares/auth';
import { getAllChannelsFromDb } from '../controllers/channelController';

const router = new express.Router();

router.get('/channels', auth, getAllChannelsFromDb);

export default router;
