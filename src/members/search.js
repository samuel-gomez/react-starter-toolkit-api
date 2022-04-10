import axios from "axios";
import { setResponseValid, setResponseInvalid } from "../utils";
import { baseRoute } from "./constants";
import { MESSAGES, TIMEOUT, options } from "../constants.js";

const MembersSearch = async (req, res) => {
  const { query } = req;
  const { name = '404' } = query;
  
  setTimeout(async () => {
    if (name === '400') {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (name === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (name === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      const { data } = await axios(
        `${baseRoute}?q={ "$or": [ { "firstname": {"$regex" :"${name}"} }, { "lastname": {"$regex" :"${name}"} } ] }`,
        options
      );
      res.send(setResponseValid({ data }));
    }
  }, TIMEOUT);
};

export default MembersSearch;
