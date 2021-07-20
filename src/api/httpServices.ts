import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: 'https://baseballcloud-back.herokuapp.com/api/v1/',
});

api.interceptors.request.use(config => {
  const token = store.getState().auth.user.token;
  const clientToken = store.getState().auth.user.clientToken;
  const email = store.getState().auth.user.email;

  if (!token) {
    return config;
  }

  return {
    ...config,
    headers: { ...config.headers, client: clientToken, ['access-token']: token, uid: email },
  };
});

export default api;
