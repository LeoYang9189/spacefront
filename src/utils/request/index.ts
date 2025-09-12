import axios, { AxiosResponse } from "axios";
import { env, logEnvInDevelopment } from "@/config/env";

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 在开发环境下打印环境变量
logEnvInDevelopment();

const service = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
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
