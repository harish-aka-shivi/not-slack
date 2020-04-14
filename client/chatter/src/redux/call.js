const BASE_URL = 'http://localhost:3000';

export const REST_METHODS = {
  GET: 'GET',
  POST: 'POST',
};

const apiFetch = ({
  endpoint,
  method,
  body,
  doAuth,
}) => async (dispatch, getState) => {
  // console.log(body, JSON.stringify(body));
  const headers = {
    'Content-Type': 'application/json',
  };
  if (doAuth) {
    headers.Authorization = getState().user.token;
  }
  const resp = await fetch(BASE_URL + endpoint, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return resp.json();
};

export default apiFetch;
