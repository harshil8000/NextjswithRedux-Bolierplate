import axios from './axios'
const Allplansapi = {
  getAllplansapi(data:any) {
    return axios.get(`/api/web/plans`,{
      params : {...data}
    });
  },
};

export default Allplansapi;
