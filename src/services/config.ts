import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://gorest.co.in';
const token: string = "914e54b98e5e0d64c4dba166c7c1fa19bdd176651df6a51786bfe4fb6f9e9aaf";

axios.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error('unauthorised');
        break;

      case 404:
        console.error('/not-found');
        break;

      case 500:
        console.error('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}, ) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}, ) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

export default request