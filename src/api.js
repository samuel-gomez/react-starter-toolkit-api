import express from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import cors from "cors";

import { members, membersDetail, membersSearch } from './members';
import { people } from './people';

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
router.get("/members/:id", membersDetail);
router.post("/members/search", membersSearch);

router.get("/people", people);

app.use("/api", router);

export const handler = serverless(app);
