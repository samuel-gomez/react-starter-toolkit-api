const setResponseInvalid = ({ errors = [], code = 500, detail = '' }) => ({
  anomaly: {
    errors,
    code,
    detail,
  },
});

export default setResponseInvalid;
