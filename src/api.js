const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use('/api', router);

router.get('/test', (req, res) => {
  res.json({ hello: 'hi' });
});

module.exports.handler = serverless(app);
