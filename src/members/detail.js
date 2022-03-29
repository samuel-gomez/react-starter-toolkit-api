import axios from "axios";
import { setResponseValid, setResponseInvalid } from "../utils";
import { baseRoute } from "./constants";
import { MESSAGES, TIMEOUT, options } from "../constants.js";

const MembersDetail = async (req, res) => {
  const { id } = req.params;

  setTimeout(async () => {
    if (id === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (id === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (id === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      const { data } = await axios(`${baseRoute}/${id}`, options);
      res.send(setResponseValid({ data }));
    }
  }, TIMEOUT);
};

export default MembersDetail;
