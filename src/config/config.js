require('dotenv').config();
require('dotenv').config({ path: '.envToken' });

const config = {
  port: process.env.PORT || 3000,
  url: process.env.URL,
  api: process.env.API,
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN,
  apiKey: process.env.API_KEY
};
module.exports = config;