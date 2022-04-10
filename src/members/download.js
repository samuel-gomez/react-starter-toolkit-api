import path from 'path';
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
          console.log(process.env.NODE_ENV)
        res.sendFile('details.csv', { root: process.env.NODE_ENV === 'development' ? 'dist' : '' });
       /*  const pathFile = path.join(__dirname, 'details.csv');
        console.log('pathFile', pathFile)
        res.sendFile(pathFile); */
        
        break;
    }
  }, timeOut);
};

export default downloadDetails;
