const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const cors = require('cors');
const fetch = require('node-fetch').default;

const app = express();
const router = express.Router();

const setResponseValid = ({ data, label = '', code = 200, detail = '' }) => ({
  responseBody: data,
  code,
  label,
  detail,
});

const options = {
  method: 'GET',
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '65ab7409a0a11a305812550215066208dce01',
  },
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/members', (req, res) => {
  const { max, skip } = req.query;
  fetch(
    `https://startertoolkitreact-82ed.restdb.io/rest/members?q={}&max=${max}&skip=${skip}`,
    options,
  )
    .then((res) => res.json())
    .then((data) => res.json(setResponseValid({ data })));
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
