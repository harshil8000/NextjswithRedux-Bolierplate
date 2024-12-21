import axios from "./axios";
const Authapi = {
  Signupapi(data: any) {
    return axios.post(`/api/users/register`, data);
  },
  LoginApi(data: any) {
    return axios.post(`/api/users/login`, data);
  },
};

export default Authapi;
