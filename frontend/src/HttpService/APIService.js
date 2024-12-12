import axios from "axios";

var baseUrl = "http://localhost:5000";

function securePost(url, payload) {
  return axios.post(`${baseUrl}${url}`, payload);
}

export { securePost };
