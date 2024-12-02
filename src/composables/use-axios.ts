import axios, { type AxiosInstance } from 'axios';
import i18n from '@/configurations/i18n.ts';
import { useUserStore } from '@/stores/user.ts';

let instance: AxiosInstance;

export const useAxios = () => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    instance.interceptors.request.use((config) => {
      config.headers.set('Accept-Language', i18n.global.locale.value);
      if (userStore.access_token) config.headers.set('Authorization', userStore.access_token);

      return config;
    });
  }

  return instance;
};
