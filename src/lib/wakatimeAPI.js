const axios = require('axios');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

class WakaTime {
  constructor() {
    this.access_token = config.accessToken;
    this.refresh_token = config.refreshToken;
    this.axios = axios.create({
      baseURL: config.url + config.api,
      headers: {
        common: {
          Authorization: `Basic ${Buffer.from(config.apiKey).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    });
  }

  async getToken() {
    const file = path.join(path.dirname(path.dirname(__dirname)), '.envToken');
    const data = {
      grant_type: 'refresh_token',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      refresh_token: config.refreshToken,
    };
    const options = {
      url: `${config.url}/oauth/token`,
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };
    try {
      const response = await this.axios(options);
      this.access_token = response.data.access_token;
      this.refresh_token = response.data.refresh_token;
      const lineWriter = fs.createWriteStream(file, { flags: 'w' });
      lineWriter.write(`ACCESS_TOKEN=${this.access_token}\n`);
      lineWriter.write(`REFRESH_TOKEN=${this.refresh_token}\n`);
    } catch (err) {
      console.log(err);
    }
  }

  // Example of access token using
  async getCurrentUserStatus1() {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.access_token}` },
      url: '/users/current/stats/last_7_days',
    };
    let response = {};
    try {
      response = await this.axios(options);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }

  // Example of basic authorization and api key using
  async getCurrentUserStatus2() {
    const options = {
      method: 'GET',
      url: '/users/current/stats/last_7_days',
    };
    let response = {};
    try {
      response = await this.axios(options);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = WakaTime;
