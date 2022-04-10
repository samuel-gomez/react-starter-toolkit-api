import {  setResponseInvalid, TIMEOUT, TIMEOUTOVER } from "../utils";

const downloadDetails = (req, res) => {
  const { id } = req.params;
  const timeOut = id === 'timeout' ? TIMEOUTOVER : TIMEOUT;

  setTimeout(() => {
    switch (id) {
      case 'error500':
        res.status(500).send(setResponseInvalid({}));
        break;
      case 'error404':
        res.status(404).send(setResponseInvalid({ code: 404 }));
        break;
      default:
        res.sendFile('details.csv', { root: 'public' });
        break;
    }
  }, timeOut);
};

export default downloadDetails;
