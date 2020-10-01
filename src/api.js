const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const cors = require("cors");
const fetch = require("node-fetch").default;

const { API_URL, API_KEY } = process.env;

const baseUrl = "https://startertoolkitreact-82ed.restdb.io/rest";

const app = express();
const router = express.Router();

const setResponseValid = ({ data, label = "", code = 200, detail = "" }) => ({
  responseBody: data,
  code,
  label,
  detail,
});

const options = {
  method: "GET",
  headers: {
    "cache-control": "no-cache",
    "x-apikey": API_KEY,
  },
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/members", async (req, res) => {
  const { max, skip, sort, dir } = req.query;
  const baseRoute = `${API_URL}/members`;
  console.log("API : ", API_URL, API_KEY);
  const members = await fetch(
    `${baseRoute}?totals=true&q={}&max=${max}&skip=${skip}&sort=${sort}&dir=${dir}`,
    options,
  );
  const membersJson = await members.json();

  res.json(setResponseValid({ data: membersJson }));
});

router.route("/login").post((req, res) => {
  const { client_id, redirect_uri, client_secret, code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      const params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");
      const scope = params.get("scope");
      const token_type = params.get("token_type");
      return fetch(
        `https://api.github.com/user?access_token=${access_token}&scope=${scope}&token_type=${token_type}`,
      );
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.use("/api", router);

module.exports.handler = serverless(app);
