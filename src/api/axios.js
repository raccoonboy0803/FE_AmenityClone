import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: 'http://15.165.17.82:8080/',
});
// http://15.165.17.82:8080/swagger-ui/index.html#/
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    const refreshtoken = Cookies.get('refreshToken');
    if (token) {
      config.headers.ACCESS_KEY = `Bearer ${token}`;
      config.headers.REFRESH_KEY = `Bearer ${refreshtoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
