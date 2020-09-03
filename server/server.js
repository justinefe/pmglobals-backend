import express from "express";
// import socket from 'socket.io';
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import route from "./route";
/**
 * Setting up the App
 * Using bodyparser and cors middlewares
 * Using express Static files
 */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 3020;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

route(app);

export default app;
