import axios, { type AxiosInstance } from 'axios';

let instance: AxiosInstance;

export const useAxios = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
  }

  console.log(import.meta.env.VITE_API_BASE_URL);

  return instance;
};
