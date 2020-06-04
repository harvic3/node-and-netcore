'use strict';

require('dotenv').config();
const config = require('./config/config'),
      express = require('express'),
      fetch = require('node-fetch');

// Constants
const HOST = (config.project.environment != "dev") ? config.server.host : config.server.defaultHost;
const PORT = config.server.port;
const greeting = "Hello world from NodeJs";
// App
const app = express();

app.get(`${config.server.serverRoot}/basic`, (req, res) => {
  res.send(`${greeting}`);
});

app.get(`${config.server.serverRoot}/full`, async (req, res) => {
  const endPoint = `http://${config.params.remoteApi}/basic`;
  const remote = await fetch(endPoint);
  let result = await remote.text();
  result = result.concat(" and NodeJs!!");
  res.send(result);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);