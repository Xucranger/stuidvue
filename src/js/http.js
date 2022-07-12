import Axios from 'axios';

export const baseUrl = 'http://127.0.0.1:8080/face';
// export const socketBaseUrl = config.baseUrl.webSocketUrl;

let axios = Axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});


export const postAxios = (url, data) => {
  return axios.post(url, data);
};

export const postFileUploadAxios = (url, data) => {
  return axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const getDownloadAxios = (url) => {
  return axios.get(url, { responseType: 'blob' });
};

export const postDownloadAxios = (url, data) => {
  return axios.post(url, data, { responseType: 'blob' });
};

export const getAxios = (url, data) => {
  return axios.get(url, {
    params: data
  });
};
