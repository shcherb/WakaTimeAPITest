const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));
