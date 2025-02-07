import axios from "axios";

const getRequest = (baseUrl, endpoint) => {
  let headers = {};

  const request = {
    url: `${baseUrl}${endpoint}`,
    method: "get",
    headers,
  };

  return axios(request);
};

const postRequest = (baseUrl, endpoint, body) => {
  if (!body) return undefined;

  let headers = {};

  const request = {
    url: `${baseUrl}${endpoint}`,
    method: "post",
    headers,
    data: body instanceof Object ? body : JSON.parse(body),
  };

  return axios(request);
};

const putRequest = (baseUrl, endpoint, body) => {
  if (!body) return undefined;

  let headers = {};

  const request = {
    url: `${baseUrl}${endpoint}`,
    method: "put",
    headers,
    data: body instanceof Object ? body : JSON.parse(body),
  };

  return axios(request);
};

const deleteRequest = (baseUrl, endpoint, body) => {
  let headers = {};

  const request = {
    url: `${baseUrl}${endpoint}`,
    method: "delete",
    headers,
  };
  if (body) {
    request.data = body instanceof Object ? body : JSON.parse(body);
  }

  return axios(request);
};

export { getRequest, postRequest, putRequest, deleteRequest };
