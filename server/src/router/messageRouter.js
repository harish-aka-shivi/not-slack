import express from 'express';
import { getAllMessagesForChannel } from '../controllers/messageController';
import auth from '../middlewares/auth';

const router = new express.Router();

router.get('/message/:channel', auth, getAllMessagesForChannel);

export default router;
