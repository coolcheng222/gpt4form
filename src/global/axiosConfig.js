import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.response.use(
    data=>{
      if(data.data.code === 0){
        return Promise.resolve(data.data.message);
      }else{
        return Promise.reject(data.data.message);
      }
    },error=>{
      return Promise.reject(error.message);
    }
)
export default axios;