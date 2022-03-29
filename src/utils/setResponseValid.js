const setResponseValid = ({ data, label = '', code = 200, detail = '' }) => ({
  responseBody: data,
  code,
  label,
  detail,
});

export default setResponseValid;
