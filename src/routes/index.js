const express = require('express');
const WakaTime = require('../lib/wakatimeAPI');

const wt = new WakaTime();
wt.getToken();

const routes = express.Router();

routes.get('/', (req, res) => res.send('Hello World!'));

// Example of access token using
routes.get('/user-status-v1', async (req, res) => {
  const apiResponse = await wt.getCurrentUserStatus1();
  res.json(apiResponse);
});

// Example of basic authorization and api key using
routes.get('/user-status-v2', async (req, res) => {
  const apiResponse = await wt.getCurrentUserStatus2();
  res.json(apiResponse);
});

module.exports = routes;
