import axios from "axios";

var baseUrl = "http://localhost:5000";

function securePost(url, payload) {
  return axios.post(`${baseUrl}${url}`, payload);
}

function secureGet(url) {
  const headers = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  return axios.get(`${baseUrl}${url}`, { headers });
}

export { securePost, secureGet };
