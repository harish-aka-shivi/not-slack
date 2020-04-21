import express from 'express';
import http from 'http';
import cors from 'cors';
import initSocket from './socketController';
import userRouter from './router/userRouter';
import messageRouter from './router/messageRouter';
import channelRouter from './router/channelRouter';

const app = express();
app.use(cors());
const server = http.createServer(app);
app.use(express.json());
app.use(userRouter);
app.use(messageRouter);
app.use(channelRouter);

initSocket(server);

export default server;
