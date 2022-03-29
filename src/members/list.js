import axios from "axios";
import { setResponseValid, setResponseInvalid } from "../utils";
import { baseRoute } from "./constants";
import { MESSAGES, TIMEOUT, options } from "../constants.js";

const Members = async (req, res) => {
  const { headers, query } = req;
  const { max, skip, sort, dir } = query;
  
  setTimeout(async () => {
    if (headers.testmock === '400') {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (headers.testmock === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (headers.testmock === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      const { data } = await axios(
        `${baseRoute}?totals=true&q={}&max=${max}&skip=${skip}&sort=${sort}&dir=${dir}`,
        options
      );
      res.send(setResponseValid({ data }));
    }
  }, TIMEOUT);
};

export default Members;
