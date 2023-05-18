import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: ' http://3.36.65.197:8080/',
});

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
