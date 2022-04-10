import express from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import cors from "cors";

import { members, membersDetail, membersSearch, downloadDetails } from './members';
import { people } from './people';

const API = 'api/';
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/members", members);
router.get("/members/search", membersSearch);
router.get("/members/:id", membersDetail);
router.get("/members/:id/download-detail", downloadDetails);

router.get("/people", people);

app.use(`/${API}`, router);

export const handler = serverless(app);
