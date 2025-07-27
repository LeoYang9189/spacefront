import axios, { AxiosResponse } from "axios";

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

const service = axios.create({
  baseURL: "http://8.149.244.70:8080",
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    if (response.status === 200 && response.data?.code === 200) {
      return response.data.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => Promise.reject(error.response.data)
);

export default {
  get: <T>(config: { url: string; params?: any }): Promise<any> =>
    service.get(config.url, { params: config.params }).then((res) => res),
  post: <T>(config: { url: string; params?: any }): Promise<any> =>
    service.post(config.url, config.params).then((res) => res),
  put: <T>(config: { url: string; params?: any }): Promise<any> =>
    service.put(config.url, config.params).then((res) => res),
  delete: <T>(config: { url: string; params?: any }): Promise<any> =>
    service.delete(config.url, { params: config.params }).then((res) => res),
};
