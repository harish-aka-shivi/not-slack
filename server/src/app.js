import express from 'express';
import http from 'http';
import initSocket from './socketController';
import userRouter from './router/userRouter';
import messageRouter from './router/messageRouter';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

initSocket(server);

export default server;
