const config = require('./config');
const restService = require('./rest-service');
const express = require('express');
const Cors = require('cors');
const SERVICE_ENDPOINT = config.serviceEndpointPrefix;
const app = express();

// BODY PARSER
app.use(express.json());
app.use(Cors());
// MOUNTING ROUTES
app.use(`${SERVICE_ENDPOINT}`, restService.router);

// const port = process.env.PORT ? process.env.Port : 4000
const port = 4000
app.listen(port, ()=> {
    console.log('server listening on port ' + port);
})