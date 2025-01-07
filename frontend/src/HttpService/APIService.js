import axios from "axios";

var baseUrl = "http://localhost:5000";

function securePost(url, payload) {
  return axios.post(`${baseUrl}${url}`, payload);
} 

function registerPost(url, payload) {
  return axios.post(`${baseUrl}${url}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function secureGet(url) {
  const headers = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  return axios.get(`${baseUrl}${url}`, { headers });
}

function post(url, payload) {
  const headers = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  return axios.post(`${baseUrl}${url}`, payload, { headers });
}

export { securePost, secureGet, registerPost, post };
