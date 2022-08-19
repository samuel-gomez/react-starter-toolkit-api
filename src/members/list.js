import axios from "axios";
import { setResponseValid, setResponseInvalid } from "../utils";
import { baseRoute } from "./constants";
import { MESSAGES, TIMEOUT, options } from "../constants.js";

const Members = async (req, res) => {
  const { headers, query } = req;
  const { max, skip, sort, dir } = query;

  setTimeout(async () => {
    if (headers.testmock === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, detail: MESSAGES.BAD_REQUEST }));
    } else if (headers.testmock === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ detail: MESSAGES.SERVOR_ERROR }));
    } else if (headers.testmock === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, detail: MESSAGES.NOT_FOUND }));
    } else if (headers.testmock === "403") {
      res
        .status(403)
        .send(setResponseInvalid({ code: 403, detail: MESSAGES.SERVOR_UNAUTHORIZED }));
    } else if (headers.testmock === "0") {
      res.send(setResponseValid({ data: [] }));
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
